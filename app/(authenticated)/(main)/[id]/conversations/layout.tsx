import ConversationsSidebar from "@/app/components/App/ConversationsSidebar";
import {ReactNode} from "react";
import {cookies} from "next/headers";

export default async function ConversationsLayout({children}: { children: ReactNode }) {
    const token: string | undefined = cookies().get("token")?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/conversations`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const uid = cookies().get("uid")?.value;
    const {message, conversations} = await response.json();

    return (
        <>
            <div
                className={`flex flex-grow max-sm:flex-grow-0 max-sm:w-full max-md:h-full max-md:hidden`}>
                <ConversationsSidebar conversations={conversations} uid={uid}/>
                <div className="flex flex-col flex-grow  max-sm:flex-grow-0">{children}</div>
            </div>
            <div
                className="md:hidden">
                <ConversationsSidebar conversations={conversations} uid={uid}/>
                {children}
            </div>
        </>
    );
}
