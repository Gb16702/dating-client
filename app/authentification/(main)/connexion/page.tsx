import AuthForm from "@/app/components/Forms/AuthForm";
import SocialAuth from "@/app/components/Forms/SocialAuth";
import Link from "next/link";

import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Connexion",
    description: "Connexion",
};

export default function Connexion(): JSX.Element {
    return (
        <div className="w-full h-full">
            <h1 className="text-[21px] font-semibold">Contents de te revoir</h1>
            <h2 className="mt-1 font-medium text-[12px] text-subtitle_foreground">Connecte-toi à ton compte</h2>
            <AuthForm type={"login"}/>
            <div className="flex flex-row justify-between items-center mt-[20px]">
                <div className="h-[1px] w-full bg-black flex-1 flex"></div>
                <span className="text-[12px] flex-[.25] justify-center flex">OU</span>
                <div className="h-[1px] w-full bg-black flex-1 flex"></div>
            </div>
            <SocialAuth/>
            <Link href="/authentification/inscription" className="block text-xs mt-5 text-subtitle_foreground">
                Pas encore membre ? <span className="underline text-black">S'inscrire</span>
            </Link>
        </div>
    );
}
