import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Toaster} from "react-hot-toast";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Harmony",
    description: "Bienvenue sur Harmony, où faire des rencontres est simple et rapide",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
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
        {children}
        </body>
        </html>
    );
}
