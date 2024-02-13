import {ReactNode} from "react";
import {cookies} from "next/headers";
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";
import SessionProvider from "../providers/SessionProvider";

export default async function Layout({children}: { children: ReactNode }) {
    const token: RequestCookie | undefined = cookies().get("token");
    const user_id = cookies().get("uid");

    return (
        <SessionProvider token={token?.value} user_id={user_id?.value}>
            {children}
        </SessionProvider>
    );
}