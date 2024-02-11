"use client";
import { ReactNode, useEffect, useState } from "react";
import { useSessionStore } from "../stores/sessionStore";
import { useSocketStore } from "../stores/socketStore";

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

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export default function SessionProvider({ children, token, user_id }: SessionProviderProps) {
  const { setSession, currentSession } = useSessionStore();
  const { connect, disconnect } = useSocketStore();

  console.log(user_id);

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

  return children;
}
