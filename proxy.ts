import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    //lets keep some routes public and some private
    const { pathname } = req.nextUrl;
    console.log(pathname);

    const publicRoutes = [
        "/login",
        "/register",
        "/api/auth",
        "/favicon.ico",
        "_next",
    ];
    if (publicRoutes.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }
    const token = await getToken({
        req,
        secret: process.env.NEXT_AUTH_SECRET,
    });
    //  console.log(token);
    if (!token) {
        //new url bnao same origin se jahan se original request ayi thee
        // example
        // orginal request thee  suppose localhost:3000/home newUrl usay bnade ga localhost:3000/login
        const loginUrl = new URL("/login", req.url);
        //         Attach a query param named callbackUrl
        // and set its value to the page user wanted
        loginUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
