"use client";

import {Montserrat} from "next/font/google";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useSessionStore} from "../../stores/sessionStore";
import Cross from "../Icons/Cross";
import Menu from "../Icons/Menu";
import Background from "../UI/Modal/Background";
import Thumbnail from "../UI/Thumbnail";
import Navigation from "./Navigation/Navigation";
import Logo from "@/app/components/UI/Logo";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: "600",
});

export default function Sidebar({is_admin}: { is_admin: boolean }) {
    const {currentSession} = useSessionStore();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (currentSession) {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 0);

            return () => clearTimeout(timer);
        }
    }, [currentSession]);

    const properties = {
        id: currentSession?.id,
        token: currentSession?.token,
        is_admin,
        username: currentSession?.profile?.first_name,
        avatar: currentSession?.profile?.profile_picture,
    };

    return (
        <>
            {open && (
                <>
                    <Background/>
                    <section className="h-full  w-full fixed top-0 left-0 z-20 flex flex-col">
                        <div className="h-[15%]"></div>
                        <div className="h-[80%] flex items-center justify-center px-2">
                            <div className="bg-white w-full rounded-[9px] overflow-hidden ">
                                <div
                                    className=" h-[50px] flex items-center justify-between border-b border-whitish_border px-4">
                                    <div className="">
                                        <h2 className="font-semibold text-[14px]">Menu</h2>
                                    </div>
                                    <div className="h-full flex items-center justify-center"></div>
                                    <div className="flex items-center justify-center">
                                        <button onClick={() => setOpen(false)} className="border p-1 rounded-[6px]">
                                            <Cross classes="w-4 h-4 text-subtitle_foreground"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center flex-grow py-4 px-4">
                                    <Navigation id={currentSession?.id} isAdmin={true}/>
                                </div>
                            </div>
                        </div>
                        <div className="h-[15%] px-2 py-5">
                            <div className="flex items-center justify-center bg-white h-full rounded-[9px] px-2">
                                <div className="flex items-center justify-start flex-row w-full gap-x-2">
                                    <Image
                                        src={properties.avatar ?? ""}
                                        alt="profile picture"
                                        className="rounded-full w-[40px] h-[40px]"
                                        width={100}
                                        height={100}
                                        objectFit="cover"
                                        priority
                                    />
                                    <div className="flex flex-col items-start justify-center text-[14px]">
                                        <h2 className="font-semibold">{properties.username}</h2>
                                        <h3 className="text-[12px] text-subtitle_foreground">
                                            {typeof Object.values(properties).map(value => value != undefined) && properties.is_admin ? "Administrateur" : "Utilisateur"}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
            <section
                className="bg-white min-w-[280px] h-screen border-r border-whitish_border flex flex-col max-md:hidden">
                <div className="flex items-center h-[8%] px-8">
                    <h1 className={`text-[18px] ${montserrat.className}`}>HARMONY</h1>
                </div>
                <div
                    className="h-[84%] flex items-center justify-center flex-col w-full px-6 border-y border-whitish_border">
                    <Navigation id={currentSession?.id} isAdmin={properties?.is_admin}/>
                </div>
                <div className="flex items-center h-[8%] px-8">
                    <Thumbnail properties={properties} loading={loading}/>
                </div>
            </section>
            <section className="md:hidden fixed w-full left-0 top-[12px] h-[70px] flex items-center justify-center">
                <div
                    className="h-full w-[97%] bg-white border border-whitish_border rounded-[9px] flex items-center justify-between px-3">
                    <Logo size={"small"}/>
                    <Menu onClick={() => setOpen(true)}/>
                </div>
            </section>
        </>
    );
}
