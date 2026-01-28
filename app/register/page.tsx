"use client";
import axios, { Axios, AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    interface ApiResponse {
        message?: string;
    }
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await axios.post("/api/auth/register", {
                name,
                email,
                password,
            });
            console.log(result.data);
            toast.success("🎉 SuccessFully Registered");
            router.push('/login')
        } catch (error) {
            console.log(error);
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(
                axiosError.response?.data?.message || "Registration failed"
            );
        }
        setName("");
        setEmail("");
        setPassword("");
    };
    return (
        <div className="min-h-screen  flex items-center justify-center text-white bg-black px-4">
            <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg bg-gray-900 flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Register
                </h1>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label
                            className="block mb-1 font-medium"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            className="w-full border-b border-white py-2 px-1 bg-gray-900  text-white outline-none placeholder-gray-400"
                            type="text"
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

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
                        onClick={() => router.push("/login")}
                        className="w-full text-center text-white"
                    >
                        Already have an account?{" "}
                        <span className="text-blue-400 hover:underline transition-all duration-150 ease-in-out transform ">
                            login
                        </span>
                    </p>
                    <button className="w-full bg-purple-950 p-2 rounded-md text-white font-semibold transition-all ease-in-out active:scale-95 duration-150 ">
                        Register
                    </button>
                </form>
                <div className="flex items-center gap-1.25 justify-center">
                    <hr className="grow border-gray-500" />
                    <span>OR</span>
                    <hr className="grow border-gray-500" />
                </div>
                <button onClick={()=>signIn('google',{callbackUrl:'/'})} className=" flex items-center justify-center gap-2 w-full bg-white p-2 rounded-md text-gray-600 font-semibold transition-all ease-in-out active:scale-95 duration-150 ">
                    <FcGoogle size={24} />
                    Sign up with google
                </button>
            </div>
        </div>
    );
};

export default Register;
