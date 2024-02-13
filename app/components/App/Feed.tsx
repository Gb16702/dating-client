"use client";

import {ReactPortal, useCallback, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import Cross from "../Icons/Cross";
import Bars from "../Icons/Feed/Bars";
import {ActiveNotifications, Notifications} from "../Icons/Notifications";
import Polygon from "../UI/Modal/Polygon";
import {useSocketStore} from "@/app/stores/socketStore";
import Image from "next/image";
import {transformDate} from "@/app/utils/transformDate";
import {getCookie} from "cookies-next";
import toast from "react-hot-toast";
import Toast from "../UI/Toast";

export default function Feed({notifications, matches}: { notifications: any, matches: any[] }) {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const {socket} = useSocketStore();
    const [notificationsList, setNotificationsList] = useState(notifications);

    const transformDateToTimeDifferenceFromNow = useCallback((date: string) => transformDate(date), []);

    function handleClick() {
        setOpen(!open);
    }

    useEffect(() => {
        if (socket) {
            socket.on("notification", (message: any) => {
                console.log(message, "notification");
                setNotificationsList((prevNotifications: any) => {
                    const updatedNotifications = [...prevNotifications, message].sort((a, b) => {
                        const dateA = new Date(a.created_at).getTime();
                        const dateB = new Date(b.created_at).getTime();
                        return dateB - dateA;
                    });
                    return updatedNotifications.slice(0, 10);
                });
            });

            return () => {
                socket.off("notification");
                socket.disconnect();
            };
        }
    }, [socket]);

    async function clearNotifications() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/notifications/clear`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
            },
        });

        const {message} = await response.json();
        toast.custom(t => <Toast message={message} type="Succès" t={t}/>);
        if (response.ok) {
            setNotificationsList([]);
        }
    }

    const modal: ReactPortal | null = modalOpen
        ? createPortal(
            <Polygon additionalClasses={`w-[500px] max-md:w-[96%] max-md:rounded-[7px]`}
                     onClickEvent={() => setModalOpen(false)} closable>
                <div className="flex items-center justify-between border-b border-whitish_border p-4 h-[65px]">
                    <h2 className="font-bold text-[19px]">Notifications</h2>
                    <button onClick={() => setModalOpen(false)} className="border p-1 rounded-[6px]">
                        <Cross classes="w-4 h-4 text-subtitle_foreground"/>
                    </button>
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                    {notificationsList.length > 0 ? (
                        notificationsList.map((notification: any, i: number) => (
                            <div key={i} className="py-5 min-h-[72px] flex items-start px-4 gap-x-3">
                                <Image
                                    src={notification.user.profile.profile_picture}
                                    alt={notification.title}
                                    width={50}
                                    height={50}
                                    className="rounded-full w-[36px] h-[36px]"
                                    objectFit="cover"
                                />
                                <div className="flex flex-col gap-y-1.5 w-full">
                                    <div className="flex justify-between w-full items-center">
                                        <div className="w-full">
                                            <div className="flex justify-between items-center w-full">
                                                <h3 className="font-bold text-sm tracking-tight">
                                                    {notification.user.profile.first_name} {notification.user.profile.last_name}
                                                </h3>
                                                <span className="text-xs font-semibold text-long_foreground">
                            {transformDateToTimeDifferenceFromNow(notification.created_at)}
                          </span>
                                            </div>
                                            <span
                                                className="text-accent_blue font-semibold text-[12px] relative bottom-0.5">{notification.title}</span>
                                        </div>
                                        <span className="text-[12px] text-accent_blue font-medium"></span>
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <p className="text-xs font-medium text-long_foreground">
                                            {notification.content.length > 50 ? notification.content.substr(0, 50) + "..." : notification.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="min-h-[20vh]">
                            <div className="h-[20vh] w-full flex items-center justify-center">
                                <h2 className="text-center text-sm font-medium text-long_foreground">Vide</h2>
                            </div>
                        </div>
                    )}
                </div>
                <div className="border-t border-whitish_border w-full px-4 h-[65px] flex items-center">
                    <button className="rounded-[6px] py-2.5 font-semibold text-[13px] tracking-wide text-accent_blue"
                            onClick={() => clearNotifications()}>
                        Marquer tout comme lu
                    </button>
                </div>
            </Polygon>,
            document.body
        )
        : null;

    return (
        <>
            {modal}
            <section
                className={`bg-white ${open ? "min-w-[280px]" : "w-[70px]"} h-screen border-l border-whitish_border flex flex-col max-md:hidden`}>
                <button
                    className="flex items-center justify-center h-[8%] min-w-full"
                    onClick={e => {
                        e.stopPropagation();
                        setModalOpen(true);
                    }}>
                    {notificationsList.length > 0 ? (
                        <ActiveNotifications classes={"w-[22px] h-[22px] text-accent_blue animate_pulse"}/>
                    ) : (
                        <Notifications classes={"w-[22px] h-[22px]"}/>
                    )}
                </button>
                <div
                    className="h-[84%] flex items-center justify-start flex-col w-full border-y border-whitish_border py-6 px-2 gap-y-6">
                    {open && matches.length > 0 && (
                        <h2 className="font-semibold flex justify-start w-full px-2">Vos derniers matchs
                            ({matches.length})</h2>
                    )}
                    <div></div>
                    {matches.map((match, i) => (
                        <div key={i} className={open ? "flex items-center gap-x-2 w-full px-2" : ""}>
                            <Image
                                src={match.profile_picture}
                                alt={match.first_name}
                                width={50}
                                height={50}
                                className="rounded-full w-[40px] h-[40px]"
                                objectFit="cover"
                            />
                            {open && (
                                <div className="flex flex-col justify-start">
                                    <h3 className="text-[14px] font-semibold">{match.first_name} {match.last_name}</h3>
                                </div>)
                            }
                        </div>
                    ))}
                </div>
                <div className="flex items-center h-[8%] justify-center w-full">
                    <button onClick={handleClick}>
                        <Bars classes="w-[24px] h-[24px] stroke-black"/>
                    </button>
                </div>
            </section>
        </>
    );
}
