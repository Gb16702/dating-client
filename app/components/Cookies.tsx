"use client"

import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Loader from "./Icons/Loader";
import Link from "next/link";

export const CookieSettings = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleAccept = () => {
        setIsLoading(true)
        setCookie("_cookie_settings", "accepted_cookie", {maxAge: 60 * 60 * 24 * 365})
        router.refresh()
    }

    return (
        <div
            className="z-[200] bg-white float-left fixed bottom-2 left-2 border-2 w-[50%] max-w-[500px] max-sm:w-full max-sm:bottom-0 max-sm:left-0 rounded-[10px] pl-8 pr-10 max-sm:pl-4 max-sm:pr-4 py-5">
            <div>
                <h1 className={"font-bold text-[19px]"}>Nous utilisons des cookies</h1>
            </div>
            <div className="grid gap-6">
                <div className="flex items-center justify-between space-x-2">
                    <div className="flex flex-col space-y-1">
                        <span className="text-sm text-subtitle_foreground leading-snug mt-3">
                            Nous utilisons des cookies pour vous garantir la meilleure expérience possible sur notre site Web. {" "}
                            <Link href={"/confidentialite"} className={"text-black underline"}>
                                En savoir plus
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <button
                    className="bg-black w-fit max-sm:w-full mt-4 max-sm:mt-6 py-2 px-6 rounded-[6px] text-white font-medium text-sm"
                    onClick={handleAccept}>
                    {isLoading ? (<Loader/>) : "J'accepte"}
                </button>

            </div>
        </div>
    )
}