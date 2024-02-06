"use client";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Loader from "./Icons/Loader";
import { useSessionStore } from "../stores/sessionStore";

export default function OauthCookie({ token, user }: { token: string; user: any }) {
  const router: AppRouterInstance = useRouter();
  const { setSession } = useSessionStore();

  useEffect(() => {
    setCookie("token", token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      secure: false,
      httpOnly: false,
      sameSite: "lax",
    });

    user = {
      ...user,
      token
    }

    setSession(user);
    router.replace("/");
  }, [token]);

  return <Loader />;
}
