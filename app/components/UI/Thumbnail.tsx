"use client";

import type {NextFont} from "next/dist/compiled/@next/font";
import {Montserrat} from "next/font/google";
import {type RefObject, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {type AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {deleteCookie} from "cookies-next";
import {useSessionStore} from "@/app/stores/sessionStore";
import Image from "next/image";

type ThumbnailProps = {
    loading: boolean;
    properties: {
        token: string | undefined;
        is_admin: boolean | undefined;
        username: string | undefined;
        avatar: string | undefined;
    };
};

const montserrat: NextFont = Montserrat({
    subsets: ["latin"],
    weight: ["500", "600"],
});

async function fetcher(token: string | undefined) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/authentication/logout`, {
        method: "GET",
        headers: {
            Authorization: `Bearer `,
        },
    });

    const {data} = await response.json();
    return data;
}

export default function Thumbnail({properties, loading}: ThumbnailProps) {
    const [open, setOpen] = useState<boolean>(false);
    const ref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const {removeSession} = useSessionStore();

    const router: AppRouterInstance = useRouter();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function handleLogout() {
        deleteCookie("token");
        deleteCookie("uid");
        removeSession();
        router.refresh();
    }

    return (
        <>
            {Object.values(properties).every(value => value != undefined) && (
                <div className={`w-full h-full flex items-center justify-between relative`}>
                    <div className="flex flex-row items-center gap-x-2">
                        {loading ? (
                            <div className="w-[36px] h-[36px] rounded-full bg-whitish_background animate-pulse"/>
                        ) : (
                            <Image
                                src={properties?.avatar ?? ""}
                                width={36}
                                height={36}
                                className="rounded-full w-[36px] h-[36px]"
                                objectFit="cover"
                                alt={properties?.avatar ?? "Image de profil"}
                            />
                        )}
                        <div className="flex-col">
                            <h3 style={{fontFamily: montserrat.style.fontFamily, fontWeight: 600}}
                                className="relative top-0.5">
                                {properties.username}
                            </h3>
                            <small
                                style={{fontFamily: montserrat.style.fontFamily, fontWeight: 500}}
                                className="text-subtitle_foreground relative bottom-1 text-[12px]">
                                {typeof Object.values(properties).map(value => value != undefined) && properties.is_admin ? "Administrateur" : "Utilisateur"}
                            </small>
                        </div>
                    </div>
                    {open && (
                        <div
                            className="min-w-[220px] h-[90px] left-[90px] rounded-[10px] bg-white border border-whitish_border flex flex-col justify-start relative bottom-[40px] overflow-hidden"
                            ref={ref}>
                            <button
                                className="h-1/2 w-full text-[14px] font-medium border-b border-whitish_background px-2 text-left text-subtitle_foreground">
                                Thème sombre
                            </button>
                            <button className="h-1/2 text-[14px] font-medium text-red-400 px-2  w-full text-left"
                                    onClick={handleLogout}>
                                Déconnexion
                            </button>
                        </div>
                    )}
                    <button className={`text-[19px] font-bold ${open && "hidden"}`} onClick={() => setOpen(true)}>
                        ...
                    </button>
                </div>
            )}
        </>
    );
}
