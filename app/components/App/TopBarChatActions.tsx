"use client";

import {ReactPortal, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import Polygon from "../UI/Modal/Polygon";
import Cross from "../Icons/Cross";
import Loader from "../Icons/Loader";
import {getCookie} from "cookies-next";
import toast from "react-hot-toast";
import Toast from "@/app/components/UI/Toast";
import {useRouter} from "next/navigation";
import MeetUsersReportForm from "@/app/components/Forms/MeetUsersReportForm";

export default function TopBarChatActions({
                                              fullName,
                                              uid,
                                              areUsersMatching,
                                              conversationId,
                                              isFavorite,
                                              isUserBlocked
                                          }: {
    fullName: string,
    uid: string,
    areUsersMatching: boolean,
    conversationId: string,
    isFavorite: boolean,
    isUserBlocked: boolean
}) {
    const [open, setOpen] = useState<boolean>(false);
    const [matchModalOpen, setMatchModalOpen] = useState(false);
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [blockedModalOpen, setBlockedModalOpen] = useState(false);

    const [value, setValue] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    console.log(isUserBlocked, "UIUI");


    function handleChange(e: any) {
        console.log(value);
        setValue(e?.target?.value);
    }

    useEffect(() => {
        if (value == fullName) {
            setDisabled(false);
        }

        return () => {
            setDisabled(true);
        };
    }, [handleChange]);

    async function breakMatch() {
        setLoading(true);
        {
            isUserBlocked
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/matches/delete/${uid}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${getCookie("token")}`,
                "Content-type": "Application/json"
            }
        });

        const {message} = await response.json();

        setLoading(false);
        toast.custom((t) => <Toast message={message} type={"Succès"} t={t}/>);
        if (response.ok) {
            setMatchModalOpen(false);
            router.refresh();
        }
    }

    async function favoritesHandler(type: string) {
        let url = `${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/conversations/${conversationId}/pin`

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${getCookie("token")}`,
                "Content-type": "Application/json"
            }
        })

        const {message} = await response.json();
        setLoading(false);
        toast.custom((t) => <Toast message={message} type={"Succès"} t={t}/>);
        if (response.ok) {
            setMatchModalOpen(false);
            router.refresh();
        }
    }

    async function blockUser() {
        let response: any;
        console.log(isUserBlocked, "UIUI")
        if (isUserBlocked) {
            response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/blocked/delete/${uid}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${getCookie("token")}`,
                    "Content-type": "Application/json"
                }
            })
        } else {
            response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/blocked/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${getCookie("token")}`,
                    "Content-type": "Application/json"
                },
                body: JSON.stringify({blockedUserId: uid})
            })
        }

        const {message} = await response.json();

        setLoading(false);
        toast.custom((t) => <Toast message={message} type={response.ok ? "Succès" : "Erreur"} t={t}/>);
        if (response.ok) {
            setBlockedModalOpen(false);
            router.refresh();
        }
    }

    const modal: ReactPortal | null = open
        ? createPortal(
            <Polygon additionalClasses={`w-[500px] max-md:w-[96%] max-md:rounded-[7px]`}
                     onClickEvent={() => setOpen(false)} closable>
                <div className="flex items-center justify-between border-b p-4">
                    <h3 className="font-bold">{fullName} </h3>
                    <button onClick={() => setOpen(false)} className="border p-1 rounded-[6px]">
                        <Cross classes="w-4 h-4 text-subtitle_foreground"/>
                    </button>
                </div>
                <div className=" font-semibold text-[14px]">
                    {areUsersMatching && (
                        <>
                            <button className="h-[60px] w-full border-b">Voir le profil</button>
                            <button
                                onClick={() => favoritesHandler(isFavorite ? "remove" : "add")}
                                className="h-[60px] w-full border-b ">
                                {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                            </button>
                            <button
                                onClick={e => {
                                    e.stopPropagation();
                                    setOpen(false);
                                    setMatchModalOpen(true);
                                }}
                                className="h-[60px] w-full border-b ">
                                Rompre le match
                            </button>
                        </>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setReportModalOpen(true);
                            setOpen(false);
                        }}
                        className="h-[60px] w-full border-b ">Signaler
                    </button>

                    {
                        isUserBlocked ? (
                            <>
                                <button
                                    onClick={blockUser}
                                    className="h-[60px] w-full ">Débloquer
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setBlockedModalOpen(true);
                                    setOpen(false);
                                }}
                                className="h-[60px] w-full ">Bloquer
                            </button>
                        )
                    }
                </div>
            </Polygon>,
            document.body
        )
        : null;

    const reportModal: ReactPortal | null = reportModalOpen ? createPortal(
            <Polygon additionalClasses={`w-[500px] max-md:w-[96%] max-md:rounded-[7px]`}
                     onClickEvent={() => setOpen(false)} closable>
                <div className="flex items-center justify-between border-b p-4">
                    <h3 className="font-bold">Signaler {fullName} </h3>
                    <button onClick={() => setReportModalOpen(false)} className="border p-1 rounded-[6px]">
                        <Cross classes="w-4 h-4 text-subtitle_foreground"/>
                    </button>
                </div>
                <div className=" font-semibold text-[14px]">
                    <MeetUsersReportForm uid={uid}/>

                </div>
            </Polygon>,
            document.body
        )
        : null;

    const blockedModal: ReactPortal | null = blockedModalOpen ? createPortal(
            <Polygon additionalClasses={`w-[500px] max-md:w-[96%] max-md:rounded-[7px]`}
                     onClickEvent={() => setBlockedModalOpen(false)} closable>
                <div className="flex items-center justify-between border-b p-4">
                    <h3 className="font-bold">Bloquer {fullName} </h3>
                    <button onClick={() => setBlockedModalOpen(false)} className="border p-1 rounded-[6px]">
                        <Cross classes="w-4 h-4 text-subtitle_foreground"/>
                    </button>
                </div>
                <div className="font-semibold text-[14px] py-6 px-4">
                    <h1 className="select-none">Pour confirmer, tape "{fullName}" dans la boite ci-dessous</h1>
                    <input
                        type="text"
                        className="w-full border outline-none h-[36px] my-2 px-2 rounded-[9px] focus:border-black transition-all duration-200"
                        onChange={e => handleChange(e)}
                        onKeyDown={(e) => e.key === "Enter" && breakMatch()}
                        spellCheck={false}
                    />

                    <button
                        className={`px-5 py-2 bg-black text-white rounded-[9px] mt-1 ${
                            disabled && "opacity-50 cursor-not-allowed transition-all duration-200"
                        }`}
                        disabled={disabled}
                        onClick={blockUser}>
                        {loading ? <Loader/> : "Bloquer"}
                    </button>
                </div>
            </Polygon>,
            document.body
        )
        : null;

    const matchModal: ReactPortal | null = matchModalOpen
        ? createPortal(
            <Polygon additionalClasses={`w-[500px] max-md:w-[96%] max-md:rounded-[7px]`}
                     onClickEvent={() => setMatchModalOpen(false)} closable>
                <div className="flex items-center justify-between border-b p-4">
                    <h3 className="font-bold select-none">Rompre avec {fullName} </h3>
                    <button onClick={() => setMatchModalOpen(false)} className="border p-1 rounded-[6px]">
                        <Cross classes="w-4 h-4 text-subtitle_foreground"/>
                    </button>
                </div>
                <div className="font-semibold text-[14px] py-6 px-4">
                    <h1 className="select-none">Pour confirmer, tape "{fullName}" dans la boite ci-dessous</h1>
                    <input
                        type="text"
                        className="w-full border outline-none h-[36px] my-2 px-2 rounded-[9px] focus:border-black transition-all duration-200"
                        onChange={e => handleChange(e)}
                        onKeyDown={(e) => e.key === "Enter" && breakMatch()}
                        spellCheck={false}
                    />

                    <button
                        className={`px-5 py-2 bg-black text-white rounded-[9px] mt-1 ${
                            disabled && "opacity-50 cursor-not-allowed transition-all duration-200"
                        }`}
                        disabled={disabled}
                        onClick={breakMatch}>
                        {loading ? <Loader/> : "Rompre"}
                    </button>
                </div>
            </Polygon>,
            document.body
        )
        : null;

    return (
        <>
            {modal}
            {matchModal}
            {reportModal}
            {blockedModal}
            <button
                onClick={e => {
                    e.stopPropagation();
                    setOpen(true);
                }}
                className="tracking-wide font-bold text-[20px]">
                ...
            </button>
        </>
    );
}
