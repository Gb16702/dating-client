import { ReactNode } from "react";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import SessionProvider from "../../providers/SessionProvider";
import Sidebar from "../../components/App/Sidebar";
import Feed from "../../components/App/Feed";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const token: RequestCookie | undefined = cookies().get("token");

  return (
    <section className="flex flex-row w-full justify-between h-full">
      <Sidebar />
      {children}
      <Feed />
    </section>
  );
}
