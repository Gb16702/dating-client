import OauthCookie from "@/app/components/OauthCookie";
import {redirect, RedirectType} from "next/navigation";

export default async function Intermediate({searchParams: {sessionId}}: { searchParams: { [key: string]: string } }) {
    if (!sessionId) redirect("/authentification/connexion", RedirectType.replace);

    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/authentication/getAuthToken`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionId}`,
        },
    });

    const {token, user} = await response.json();

    return <OauthCookie token={token} user={user}/>;
}