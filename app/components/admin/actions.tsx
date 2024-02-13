import {getCookie} from "cookies-next";

const BASE_API_URL = process.env.NEXT_PUBLIC_SERVER;
const apiUrl = (path: string) => `${BASE_API_URL}${path}`;

export function ViewAction(row: any, href: string, router: any) {
    router.push(`${href}/${row.getValue("id")}`);
}

export function DeleteAction(id: string, href: string) {
    fetch(apiUrl(href + "/" + id), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("token")}`,
        },
    })
}

export function EditAction(row: any, href: string, router: any) {
    router.push(`${href}/${row.getValue("id")}`);
}

export function BanAction(user_id: string, href: string, reason: string) {
    fetch(apiUrl(href), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({user_id, reason}),
    })
}

export function ChangeRoleAction(user_id: string, href: string) {
    fetch(apiUrl(href), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({user: user_id}),
    })
}