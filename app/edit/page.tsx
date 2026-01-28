"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { toast } from "sonner";
import { userDataContext } from "../context/UserContext";

const Page = () => {
    const  data  = useContext(userDataContext);
    const [name, setName] = useState("");
    const [frontendImg, setFrontendImg] = useState("");
    const [backendImg, setBackendImg] = useState<File>();
    const imgInputRef = useRef<HTMLInputElement>(null);
    const [loading,setloading]=useState<boolean>(false)
    useEffect(() => {
        if (data?.user?.name) {
            setName(data.user.name);
            setFrontendImg(data.user.image as string);
        }
    }, [data?.user?.name, data?.user?.image]);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length == 0) {
            return;
        }
        const file = files[0];
        setBackendImg(file);
        setFrontendImg(URL.createObjectURL(file));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        setloading(true)
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            if (backendImg) {
                formData.append("file", backendImg);
            }

            const result = await axios.post("/api/edit", formData);
            console.log(result);
            toast.success("Changes Saved")
            data?.setUser(result.data)
            setloading(false)
        } catch (error) {
            console.log(error);
            setloading(false)
        }
    };
    return (
        <div className="bg-black min-h-screen flex flex-col justify-center items-center text-white px-4">
            <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg text-center relative flex items-center flex-col">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Edit Profile
                </h1>
                <form onSubmit={handleSubmit} className="space-y-2 flex flex-col w-full items-center">
                    <div
                        onClick={() => imgInputRef.current?.click()}
                        className="w-25 h-25 rounded-full border-2 flex justify-center items-center border-white transition-all hover:border-blue-500 text-white hover:text-blue-500 cursor-pointer overflow-hidden relative"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            ref={imgInputRef}
                            onChange={handleImage}
                        />
                        {frontendImg ? (
                            <Image src={frontendImg} fill alt="no img" />
                        ) : (
                            <CgProfile size={22} color="white" />
                        )}
                    </div>
                    <div className="w-full text-left">
                        <label
                            className="block mb-1 font-medium "
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            className="w-full border-b border-white py-2 px-1 bg-black  text-white outline-none placeholder-gray-400"
                            type="text"
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <button className={`w-full mt-3  ${loading?'bg-gray-600':'bg-blue-500'}   text-white font-semibold py-2 px-4 rounded-lg transition-all active:scale-95`} disabled={loading}>
                        {loading? 'Saving...':'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;
