import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";
import {Toaster} from "react-hot-toast";
import "./globals.css";
import {cookies} from "next/headers";
import {CookieSettings} from "@/app/components/Cookies";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Harmony",
    description: "Bienvenue sur Harmony, où faire des rencontres est simple et rapide",
};

export const viewport: Viewport = {
    initialScale: 1,
    width: "device-width",
    userScalable: false,
}

export default function RootLayout({children}: { children: React.ReactNode }) {

    const approvedCookies = cookies().get("_cookie_settings");

    return (
        <html lang="fr" suppressHydrationWarning>
        <body className={`${inter.className} bg-whitish_background h-screen`}>
        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                duration: 3000,
                style: {
                    height: "200px",
                },
            }}
        />
        {!approvedCookies && <CookieSettings/>}
        {children}
        </body>
        </html>
    );
}
