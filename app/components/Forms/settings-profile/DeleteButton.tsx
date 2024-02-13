import {deleteCookie, getCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';

export default function DeleteButton() {
    const router = useRouter()

    async function handleSubmit() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/delete/${getCookie("uid")}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
            },
        })

        if (response.ok) {
            const cookies = document.cookie.split(';');
            cookies.forEach((cookie) => {
                const cookieName = cookie.split('=')[0].trim();

                if (cookieName !== '_cookie_settings') {
                    deleteCookie(cookieName);
                }
            });

            router.push("/authentification/connexion");
        }
    }

    return (
        <>
            <button className="w-full border " onClick={handleSubmit}>Supprimer mon compte</button>
        </>
    )
}