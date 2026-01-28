"use client";
import axios, { Axios, AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const session =useSession()
   console.log(session?.data?.user);
   
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            //SignIn function next ka apna ha , isko bs provider btana prta ha
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            console.log(result);
            if (result?.error) {
                toast.error(result.error);
                return;
            }
            toast.success("successfully logged in");
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen  flex items-center justify-center text-white bg-black px-4">
            <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg bg-gray-900 flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Login
                </h1>
                <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                        <label
                            className="block mb-1 font-medium"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            className="w-full border-b border-white py-2 px-1 bg-gray-900  text-white outline-none placeholder-gray-400"
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div>
                        <label
                            className="block mb-1 font-medium"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            className="w-full border-b border-white py-2 px-1 bg-gray-900  text-white outline-none placeholder-gray-400"
                            type="password"
                            placeholder="Enter your Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <p
                        onClick={() => router.push("/register")}
                        className="w-full text-center text-white"
                    >
                        New Here?{" "}
                        <span className="text-blue-400 hover:underline transition-all duration-150 ease-in-out transform ">
                            SignUp now
                        </span>
                    </p>
                    <button className="w-full bg-purple-950 p-2 rounded-md text-white font-semibold transition-all ease-in-out active:scale-95 duration-150 ">
                        Login
                    </button>
                </form>
                <div className="flex items-center gap-1.25 justify-center">
                    <hr className="grow border-gray-500" />
                    <span>OR</span>
                    <hr className="grow border-gray-500" />
                </div>
                <button 
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className=" flex items-center justify-center gap-2 w-full bg-white p-2 rounded-md text-gray-600 font-semibold transition-all ease-in-out active:scale-95 duration-150 "
                >
                    <FcGoogle size={24} />
                    SignIn with google
                </button>
            </div>
        </div>
    );
};

export default Login;
