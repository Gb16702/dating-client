"use client";

import ConversationsNavigation from "./Navigation/ConversationsNavigation";
import {usePathname} from "next/navigation";

export type ConversationsSidebarProps = {
    conversations: any[];
    uid: string | undefined;
}

export default function ConversationsSidebar({conversations, uid}: ConversationsSidebarProps) {

    const pathname = usePathname();
    console.log(pathname)

    const shouldDisplay = pathname.split("/")[pathname.split("/").length - 1].includes("conversations");

    return (
        <>
            <div
                className={`bg-white border-r border-whitish_border max-w-[400px] max-md:max-w-full h-screen flex flex-grow flex-col ${!shouldDisplay && "hidden"}`}>
                <div className="flex items-center h-[calc(8%+1px)] px-8 border-b border-whitish_border max-md:hidden">
                    <h1 className="font-medium">Conversations</h1>
                </div>
                <ConversationsNavigation conversations={conversations} uid={uid}/>
            </div>
        </>
    );
}
