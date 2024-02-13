"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {getCookie} from "cookies-next";

type arrayElems = {
    name: string;
    path: string;
};

export default function ProfileNavigation(): JSX.Element {
    const pathname: string = usePathname();
    const token = getCookie("uid");

    const array: arrayElems[] = [
        {
            name: "Personnalisation",
            path: "personnalisation",
        },
        {
            name: "Paramètres",
            path: "parametres",
        },
    ];

    function isActive(href: string) {
        return pathname.split("/").pop() === href;
    }

    return (
        <>
            <section className="w-full">
                {array.map((item: arrayElems, index: number) => (
                    <div
                        key={index}
                        className="border-b border-whitish_border h-[73px] px-8 flex items-center"
                    >
                        <Link
                            href={`https://no-idea.online/${token}/profil/${item.path}`}
                            className={`text-[14px] ${
                                isActive(item.path)
                                    ? "text-accent_blue"
                                    : "text-subtitle_foreground"
                            }`}
                        >
                            {item.name}
                        </Link>
                    </div>
                ))}
            </section>
        </>
    );
}
