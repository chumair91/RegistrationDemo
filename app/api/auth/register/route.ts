import connectDb from "@/app/lib/db";
import User from "@/app/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

interface registerReqBody {
  name: string;
  password: string;
  email: string;
}
export async function POST(request: NextRequest) {
  try {
    const { name, email, password }: registerReqBody = await request.json();
    console.log(name,email,password);
    
    await connectDb();
    const exUser = await User.findOne({ email });
    if (exUser) {
      console.log("user already exist");
      
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 },
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be atleast of length 6" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Internal server error ${error}` },
      { status: 500 },
    );
  }
}
