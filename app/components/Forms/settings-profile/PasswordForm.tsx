import {getCookie} from "cookies-next";
import {useState} from "react";

export default function PasswordForm() {
    const [currentPassword, setcurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    function handleSubmit() {
        if (currentPassword === "" || newPassword === "" || confirmPassword === "") {
            alert("Veuillez remplir tous les champs");
        }

        if (newPassword !== confirmPassword) {
            alert("Les mots de passe ne sont pas identiques");
        }

        fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/edit-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
            },
            body: JSON.stringify({password: currentPassword, newPassword}),
        })
    }

    return (
        <div>
            <input onChange={e => setcurrentPassword(e.target.value)} className="border" type="password"/>
            <input onChange={e => setNewPassword(e.target.value)} className="border" type="password"/>
            <input onChange={e => setConfirmPassword(e.target.value)} className="border" type="password"/>

            <button onClick={handleSubmit}>Valider</button>
        </div>
    )
}