"use client";
import {ReactNode, useEffect} from "react";
import {useSessionStore} from "../stores/sessionStore";
import {useSocketStore} from "../stores/socketStore";
import {useMessageStore} from "@/app/stores/messageStore";

type SessionProviderProps = {
    token: string | undefined;
    children: ReactNode;
    user_id: string | undefined;
};

async function fetchUserData(token: string | undefined) {
    if (!token) return null;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const {data} = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

export default function SessionProvider({children, token, user_id}: SessionProviderProps) {
    const {setSession, currentSession} = useSessionStore();
    const {connect, disconnect, socket} = useSocketStore();
    const {addMessageToConversation} = useMessageStore();

    useEffect(() => {
        if (!currentSession && token) {
            fetchUserData(token).then(data => {
                if (data) {
                    setSession({
                        ...data,
                        token,
                    });
                }
            });
        }

        connect(user_id);

        return () => {
            disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("new_message", (message: any) => {
                addMessageToConversation(message.conversation_id, {
                    id: message.id,
                    content: message.content,
                    sender: message.sender_id,
                });
            });

            return () => {
                socket.off("new_message");
            };
        }
    }, [socket]);

    return children;
}
