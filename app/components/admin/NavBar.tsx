"use client";
import {useSessionStore} from "@/app/stores/sessionStore";
import Image from "next/image";

export default function NavBar() {
    const {currentSession} = useSessionStore();

    if (!currentSession) {
        return (
            <div className="animate-pulse w-10 h-10 bg-gray-200 rounded-full"></div>
        );
    }

    return (
        <Image
            src={currentSession?.profile?.profile_picture as string}
            width={40}
            height={40}
            alt="Avatar"
            className="w-[40px] h-[40px] rounded-full object-cover"
        />
    );
}