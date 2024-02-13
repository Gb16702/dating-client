import {cookies} from "next/headers";

export default async function Page() {
    const token: string | undefined = cookies().get("token")?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/conversations`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const uid = cookies().get("uid")?.value;
    const {message, conversations} = await response.json();

    return (
        <>


        </>)
}