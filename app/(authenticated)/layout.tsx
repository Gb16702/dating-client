import { ReactNode } from "react";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import SessionProvider from "../providers/SessionProvider";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const token: RequestCookie | undefined = cookies().get("token");

  return (
    <SessionProvider token={token?.value}>
      {children}
    </SessionProvider>
  );
}
