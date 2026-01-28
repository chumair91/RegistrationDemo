"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi";
import { userDataContext } from "./context/UserContext";
const Page = () => {
    const colors = [
        "border-red-500",
        "border-blue-500",
        "border-green-500",
        "border-yellow-500",
    ];
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const data=useContext(userDataContext);
    // console.log(data);
    
    const router=useRouter()
    // console.log(data);

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await signOut();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % colors.length);
        }, 700);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black min-h-screen flex flex-col justify-center items-center text-white px-4">
            {data && (
                <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg text-center relative flex items-center flex-col">
                    <HiPencil size={22} color="white" className="absolute right-5 top-5 cursor-pointer" onClick={()=>router.push('/edit')}/>
                    {data?.user?.image && (
                        <div className="relative rounded-full flex w-50 h-50 border-2 border-white overflow-hidden">
                            <Image
                                src={data.user.image}
                                fill
                                sizes="200px"
                                alt="kuch bhi"
                                loading="eager"
                                // width={150}
                                // height={150}
                            />
                        </div>
                    )}
                    <h1 className="text-2xl font-semibold my-4">
                        Welcome,{data?.user?.name}
                    </h1>
                    <button onClick={()=>handleSignOut()} className="w-full bg-white text-black p-4  rounded-4xl font-bold text-xl transition-all duration-150 active:scale-95">
                        Sign Out
                    </button>
                </div>
            )}
            {!data && (
                <div
                    className={`${colors[index]} border-b-4 border-t-4 border-l-4   h-25 w-25 p-4 rounded-[50%] border-dotted  animate-spin`}
                ></div>
            )}
        </div>
    );
};

export default Page;
