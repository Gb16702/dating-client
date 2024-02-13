import {getCookie} from "cookies-next";
import {useState} from "react";
import toast from "react-hot-toast";
import Toast from "@/app/components/UI/Toast";

export default function PasswordForm() {
    const [currentPassword, setcurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    async function handleSubmit() {
        if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
            alert("Veuillez remplir tous les champs");
        }

        if (newPassword !== confirmPassword) {
            alert("Les mots de passe ne sont pas identiques");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/edit-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
            },
            body: JSON.stringify({password: currentPassword, newPassword}),
        })

        if (response.ok) {
            toast.custom(t => <Toast message={"Mot de passe modifié"} type="Succès" t={t}/>);
        }
    }

    return (
        <div className="flex flex-col justify-start gap-y-2">
            <input onChange={e => setcurrentPassword(e.target.value)}
                   className="border w-[280px] h-[36px] rounded-[9px] text-sm px-2 outline-none" type="password"
                   placeholder="Mot de passe actuel"/>
            <input onChange={e => setNewPassword(e.target.value)}
                   className="border w-[280px] h-[36px] rounded-[9px] text-sm px-2 outline-none"
                   type="password" placeholder={"Nouveau mot de passe"}/>
            <input onChange={e => setConfirmPassword(e.target.value)}
                   className="border w-[280px] h-[36px] rounded-[9px] text-sm px-2 outline-none"
                   placeholder={"Confirmer le nouveau mot de passe"}
                   type="password"/>

            <button className={"w-fit bg-black py-2 px-4 text-white font-semibold text-[14px] rounded-[9px]"}
                    onClick={handleSubmit}>Valider
            </button>
        </div>
    )
}