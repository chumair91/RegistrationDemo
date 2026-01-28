"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import UserContext from "./context/UserContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SessionProvider>
                <UserContext>{children}</UserContext>
            </SessionProvider>

            <Toaster richColors position="top-right" />
        </>
    );
}
