import {cookies} from "next/headers";
import Image from "next/image";
import Link from "next/link";

async function getUserMatches(token: string | undefined) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/get-matches`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    return await response.json();
}

export default async function page() {
    const token: string | undefined = cookies().get("token")?.value;

    const {matches} = await getUserMatches(token);

    return (
        <>
            <div className="flex-grow p-8 w-2/5">
                <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Rechercher..."
                />
                <div className="mt-4 space-y-4">
                    {matches.map((match: any) => (
                        <Link
                            href={`/profil/${match.profile.user_id}`}
                            key={match.id}
                            className="flex items-center space-x-4"
                        >
                            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                <Image width={40} height={40} className="aspect-square h-full w-full" alt="Dua Lipa"
                                       src={match.profile.profile_picture}/>
                            </span>
                            <div className="flex-grow">
                                <div className="font-medium">{match.profile.first_name} {match.profile.last_name}</div>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-400"
                            >
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}