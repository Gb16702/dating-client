"use client";

import { useMessageStore } from "@/app/stores/messageStore";
import { useSocketStore } from "@/app/stores/socketStore";
import { useEffect, useRef, useState } from "react";
import Send from "../Icons/Send";
import { getCookie } from "cookies-next";
import Image from "next/image";

export default function Chat({ conversation_id, token, conversation, otherUser}: any) {
  const [inputValue, setInputValue] = useState("");
  const { socket } = useSocketStore();
  const { messages, initialize, addMessage } = useMessageStore();

  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  console.log(otherUser);

  if (conversation.length > 0 && messages.length <= 0) {
    initialize(
      conversation.map((message: any) => ({
        id: message.id,
        content: message.content,
        sender: message.sender_id,
      }))
    );
  }
  async function handlePrivateMessage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        conversationId: conversation_id,
        content: inputValue,
      }),
    });

    if (res.ok) {
      const { message } = (await res.json()) as any;
      addMessage({
        id: message.id,
        content: message.content,
        sender: message.sender_id,
      } as any);
      setInputValue("");
    }
  }

  console.log(messages, "messages");
  const userId = getCookie("uid");

  useEffect(() => {
    if (socket) {
      socket.on("new_message", (message: any) => {
        addMessage({
          id: message.id,
          content: message.content,
          sender: message.sender_id,
        } as any);
        setInputValue("");
      });

      return () => {
        socket.off("new_message");
      };
    }
  }, [conversation_id, socket]);

  useEffect(() => {
    if (conversation.length > 0 && messages.length <= 0) {
      initialize(
        conversation.map((message: any) => ({
          id: message.id,
          content: message.content,
          sender: message.sender_id,
        }))
      );
    }
    scrollToBottom();
  }, [messages]);

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      handlePrivateMessage();
    }
  }

  console.log(messages);

  return (
    <>
      <section className="px-10 overflow-y-scroll min-w-full max-h-[calc(100vh-16vh)] bg-white no-scrollbar pb-2">
        {messages.map((message, index) => (
          <div
            className={`text-black font-medium text-sm h-[40px] flex items-center mt-2 ${
              message.sender === userId ? "justify-end" : "justify-start"
            }`}
            key={message.id}>
            {/* @ts-ignore */}
            <div className="w-fit">
              <div className={`${message.sender !== userId && "flex gap-x-3 items-center"}`}>
                {message.sender !== userId && (
                  <Image
                    src={otherUser.profile_picture}
                    alt={otherUser.first_name}
                    width={20}
                    height={20}
                    className="rounded-full w-[26px] h-[26px]"
                  />
                )}
                <div className={`${message.sender === userId ? "bg-whitish_background" : "border border-whitish_border"} px-3 py-1   rounded-[9px]`}>
                  {message.content}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </section>

      <section className="min-h-[calc((100vh/100)*8)] w-full flex items-center px-10 gap-x-3 bg-white">
        <div className="flex-grow h-[50px] flex gap-x-4">
          <input
            type="text"
            placeholder={otherUser.areUsersMatching ? "Votre message..." : "Vous ne pouvez plus répondre à cette conversation"}
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            className={`h-full flex flex-grow px-2 text-sm rounded-[8px] outline-none ${!otherUser.areUsersMatching ? "bg-whitish_background cursor-not-allowed" : "bg-transparent border border-whitish_border"}`}
            disabled={!otherUser.areUsersMatching}
            onKeyDown={handleKeyDown}
          />
          {otherUser.areUsersMatching && (
              <button
                  onClick={handlePrivateMessage}
                  className="h-full w-[50px] rounded-[8px] border border-whitish_border flex items-center justify-center">
                <Send classes="fill-black w-5 h-5 relative right-[2px] top-[2px]" strokeWidth={6} />
              </button>
          )}
        </div>
      </section>
    </>
  );
}
