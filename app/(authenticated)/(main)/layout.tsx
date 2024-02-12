import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { ReactNode } from "react";
import Feed from "../../components/App/Feed";
import Sidebar from "../../components/App/Sidebar";

async function getNotifications(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/notifications/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })

  return await response.json()
}

export default async function Layout({ children }: { children: ReactNode }) {
  const token: RequestCookie | undefined = cookies().get("token");

  const notifications = await getNotifications(token?.value as string);

  console.log(notifications, "notifications");

  return (
    <section className="flex flex-row w-full justify-between h-full">
      <Sidebar />
      {children}
      <Feed notifications={notifications} />
    </section>
  );
}