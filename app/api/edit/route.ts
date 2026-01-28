import uploadOnCloudinary from "@/app/lib/cloudinary";
import connectDb from "@/app/lib/db";
import User from "@/app/model/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/app/lib/auth";

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        //this is like useSession but on server side
        const session = await getServerSession(authOptions);

        console.log("Session:", session);
        if (!session || !session.user?.email) {
            return NextResponse.json(
                { message: "User does not exist in session" },
                { status: 400 }
            );
        }
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const file = formData.get("file") as Blob | null;
        let imageUrl ;
        if (file) {
            imageUrl = await uploadOnCloudinary(file);
        }
        const user = await User.findByIdAndUpdate(
            session.user.id,
            {
                name,
                image: imageUrl,
            },
            { new: true }
        );
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 400 }
            );
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Edit API Error:", error);
        return NextResponse.json(
            { message: "update error", error: String(error) },
            { status: 500 }
        );
    }
}
