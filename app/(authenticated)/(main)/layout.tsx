import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";
import {cookies} from "next/headers";
import {ReactNode} from "react";
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

export default async function Layout({children}: { children: ReactNode }) {
    const token: RequestCookie | undefined = cookies().get("token");
    const notifications = await getNotifications(token?.value as string);

    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/get-matches`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
    })

    const {matches} = await response.json();

    let array = [];
    for (const match of matches) {
        array.push(match.profile);
    }

    const whoiam = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`,
        },
        cache: "no-store",
    });

    const {data: {is_admin}} = await whoiam.json();

    return (
        <section className="flex flex-row w-full justify-between h-full">
            <Sidebar is_admin={is_admin}/>
            {children}
            <Feed notifications={notifications} matches={array}/>
        </section>
    );
}