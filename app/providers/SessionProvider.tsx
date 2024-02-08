"use client";

import { useSessionStore } from "../stores/sessionStore";
import { ReactNode } from "react";
import { io } from "socket.io-client";

type sessionProviderProps = {
  token: string | undefined;
  children: ReactNode;
};

async function fetcher(token: sessionProviderProps["token"]) {
  console.log(token);
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = await response.json();
  return data;
}

export default function SessionProvider({ children, token }: sessionProviderProps) {
  const { setSession, currentSession } = useSessionStore();

  if (!currentSession) {
    fetcher(token).then(data => {
      setSession({
        ...data,
        token,
      });
    });
  }

  const socket = io("http://localhost:20000")
  socket.on('news', (data) => {
    console.log(data)
    socket.emit('event', { my: 'data' })
  })

  return <div className="h-full">{children}</div>;
}
