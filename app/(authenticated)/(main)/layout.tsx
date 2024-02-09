import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import Feed from "../../components/App/Feed";
import Sidebar from "../../components/App/Sidebar";

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
