"use client";

import {useSettingsStore} from "@/app/stores/profileSectionStore";
import {useSessionStore} from "@/app/stores/sessionStore";
import PasswordForm from "../Forms/settings-profile/PasswordForm";
import DeleteButton from "../Forms/settings-profile/DeleteButton";

export default function CustomSettingsRender() {
    const {active} = useSettingsStore();
    const {currentSession} = useSessionStore();

    return (
        <>
            <section className="flex flex-col min-w-full h-full bg-white">
                <div className="min-h-[73px] flex items-center">
                    <div className="min-w-full px-2 h-[60%] bg-white">
                        <h1 className="font-semibold">{active!.charAt(0).toUpperCase() + active!.slice(1)}</h1>
                        {active === "password" &&
                            <h2 className="text-subtitle_foreground text-sm mt-0.5">Modifie ton mot de passe</h2>}
                        {active === "supprimer mon compte" &&
                            <h2 className="text-subtitle_foreground text-sm mt-0.5">Supprime ton compte</h2>}
                    </div>
                </div>
                <div className="h-full w-full px-2 pt-6">
                    {active === "password" && <PasswordForm/>}
                    {active === "supprimer mon compte" && <DeleteButton/>}
                </div>
            </section>
        </>
    );
}