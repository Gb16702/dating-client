"use client";

import {ReactPortal, useEffect, useRef, useState} from "react";
import MeetUsersLoading from "./MeetUsersLoading";
import Card from "./Card";
import Image from "next/image";
import {Montserrat} from "next/font/google";
import Player from "../Icons/Tracks/Player";
import Back from "../Icons/Tracks/Back";
import Pause from "../Icons/Tracks/Pause";
import Polygon from "../UI/Modal/Polygon";
import {createPortal} from "react-dom";
import MeetUsersReportForm from "../Forms/MeetUsersReportForm";
import Report from "../Icons/Report";
import Flip from "../Icons/Flip";
import {useSwipeable} from "react-swipeable";
import Cross from "@/app/components/Icons/Cross";

type MeetUsersProps = {
    token: string | undefined;
};

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

async function loadUsers(token: MeetUsersProps["token"], page?: number) {
    let url: string = `${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/meet-users`;
    if (page) {
        url += `?page=${page}`;
    }
    const response = await fetch(`${url}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const {users, message} = await response.json();
    return {users, response: {status: response.status, message}};
}

async function sendUserAction(token: MeetUsersProps["token"], userId: string, action: "swipe" | "like") {
    let data;
    action === "swipe" ? (data = {swiped_id: userId}) : (data = {liked_id: userId});

    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/${action}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
}

export default function MeetUsers({token}: MeetUsersProps): JSX.Element {
    const [currentPage, setCurrentPage] = useState(0);
    const [index, setIndex] = useState(0);
    const [iterableUsers, setIterableUsers] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [currentTrackIndex, setCurrentTrackIndex] = useState<any>(0);
    const [playing, setPlaying] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [swipeDirection, setSwipeDirection] = useState(0);
    const [cardStyle, setCardStyle] = useState({} as any);
    const [warningModalOpen, setWarningModalOpen] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const swipeRef = useRef();
    const buttonRef = useRef<any>();

    const currentUserTracks = iterableUsers[index]?.tracksData || [];

    const fetchUsers = async (page: number) => {
        setLoading(true);
        try {
            const {users: data, response} = await loadUsers(token, page);
            if (response.status >= 200 && response.status < 300) {
                setIterableUsers(data);
            } else if (response) {
                setMessage(response.message);
                setIterableUsers([]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage, token]);

    useEffect(() => {
        audioRef.current = new Audio();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [audioRef]);

    const handleUserAction = async (action: "swipe" | "like", approved: boolean = false, e?: any) => {
        if (action === "like" && !iterableUsers[index].is_verified && !approved) {
            e.stopPropagation();
            setWarningModalOpen(true);
            return;
        }
        if (index < iterableUsers.length) {
            const userId = iterableUsers[index].id;
            await sendUserAction(token, userId, action);
            setIndex(prevIndex => prevIndex + 1);
            setWarningModalOpen(false);
        }

        if (index >= iterableUsers.length - 1) {
            setCurrentPage(prevPage => prevPage + 1);
            setIndex(0);
        }
    };

    const handleTrackStatusChange = (status: "back" | "play" | "pause" | "next") => {
        const currentTrack = currentUserTracks[currentTrackIndex];

        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.src = currentTrack.preview;
                audioRef.current.volume = 0.04;
                audioRef.current.play();
                setPlaying(true);

                audioRef.current.onended = () => {
                    setPlaying(false);
                    if (audioRef?.current) {
                        audioRef.current.currentTime = 0;
                    }
                };
            }
        };

        if (status === "back" && currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
            setPlaying(false);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        } else if (status === "play") {
            playAudio();
        } else if (status === "pause") {
            if (audioRef.current) {
                audioRef.current.pause();
                setPlaying(false);
            }
        } else if (status === "next" && currentTrackIndex < currentUserTracks.length - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
            setPlaying(false);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    };

    const modal: ReactPortal | null = modalOpen
        ? createPortal(
            <Polygon additionalClasses={`w-[500px] max-md:w-[96%] max-md:rounded-[7px]`}
                     onClickEvent={() => setModalOpen(false)} closable>
                <div className="flex items-center justify-between border-b p-4">
                    <h3 className="font-bold text-accent_blue">Signaler {iterableUsers[index].first_name}</h3>
                </div>
                <MeetUsersReportForm uid={iterableUsers[index].id}/>
            </Polygon>,
            document.body
        )
        : null;

    const warningModal: ReactPortal | null = warningModalOpen
        ? createPortal(
            <Polygon additionalClasses={`w-[500px] max-md:w-[96%] max-md:rounded-[7px]`}
                     onClickEvent={() => setWarningModalOpen(false)} closable>
                <div className="flex items-center justify-between p-4 h-[65px]">
                    <h2 className="font-bold text-[19px]">Utilisateur non vérifié</h2>
                    <button onClick={() => setWarningModalOpen(false)} className="border p-1 rounded-[6px]">
                        <Cross classes="w-4 h-4 text-subtitle_foreground"/>
                    </button>
                </div>
                <div className="pt-2 text-sm font-medium px-4 text-subtitle_foreground">
                    Cet utilisateur n'a pas vérifé son adresse mail. Son compte pourrait être supprimé dans les 24
                    heures
                </div>
                <div className="px-4 mt-2 py-4 gap-x-2">
                    <button
                        onClick={() => handleUserAction("like", true)}
                        className="bg-black w-fit max-md:w-full mt-4 max-md:mt-6 py-2.5 px-9 rounded-[9px] text-white font-medium text-sm"
                    >
                        J'aime
                    </button>
                    <button
                        onClick={() => setWarningModalOpen(false)}
                        className="bg-black w-fit max-md:w-full mt-4 max-md:mt-6 py-2 px-6 rounded-[6px] text-black font-medium text-sm bg-transparent"
                    >
                        Annuler
                    </button>
                </div>
            </Polygon>,
            document.body
        )
        : null;

    const handlers = useSwipeable({
        onSwiping: e => {
            setSwipeDirection(e.dir === "Right" ? swipeDirection + 1 : e.dir === "Left" && ((swipeDirection - 1) as any));
            if (swipeRef.current) {
                cancelAnimationFrame(swipeRef.current);
            }

            const updateSwipe = () => {
                setCardStyle({
                    transform: `translateX(${e.deltaX}px)`,
                    background: `${swipeDirection > 20 && `rgba(17, 12, 254, ${Math.abs(e.deltaX) / 500})`}`,
                    opacity: `${swipeDirection < -5 && 1 - Math.abs(e.deltaX) / 200}`,
                    color: `${swipeDirection > 20 && `rgba(255, 255, 255, ${Math.abs(e.deltaX)})`}`,
                });
            };

            swipeRef.current = requestAnimationFrame(updateSwipe) as any;
        },
        onSwiped: e => {
            if (swipeRef.current) {
                cancelAnimationFrame(swipeRef.current);
            }
            if (Math.abs(e.deltaX) > 220) {
                const action = e.dir === "Right" ? "like" : e.dir === "Left" && ("swipe" as any);
                buttonRef?.current?.click();
            }

            setCardStyle({
                transform: `translateX(0px)`,
                background: "white",
            });

            setSwipeDirection(0);
        },
        preventScrollOnSwipe: true,
    });

    console.log(iterableUsers)

    return (
        <>
            {modal}
            {warningModal}
            {loading ? (
                <>
                    <div className="max-md:hidden">
                        <MeetUsersLoading size={2}/>
                    </div>
                    <div className="md:hidden w-[270px]">
                        <MeetUsersLoading size={1}/>
                    </div>
                </>
            ) : iterableUsers.length > 0 ? (
                <>
                    <div {...handlers} className="flex flex-col gap-y-2 max-md:w-full items-center max-md:h-full">
                        <div className="md:hidden flex flex-grow flex-1 h-full"></div>
                        <div
                            className="flex flex-row max-sm:flex-col  justify-center items-center gap-x-2 w-full relative">
                            <Card loading={false} hiddenOnPhoneFormat>
                                <div className=" w-full h-full flex flex-col gap-y-2">
                                    {currentUserTracks && currentUserTracks.length > 0 && (
                                        <>
                                            <div className="h-[50%] flex items-end justify-center">
                                                <Image
                                                    src={currentUserTracks[currentTrackIndex].image}
                                                    alt="profile picture"
                                                    className="rounded-full"
                                                    width={95}
                                                    height={95}
                                                    objectFit="cover"
                                                    priority
                                                />
                                            </div>
                                            <div className="flex flex-col gap-y-1 text-center">
                                                <h2 className="font-semibold"
                                                    style={{fontFamily: montserrat.style.fontFamily, fontWeight: 600}}>
                                                    {currentUserTracks[currentTrackIndex].artist}
                                                </h2>
                                                <h3 className="text-[12px] font-medium">
                                                    {currentUserTracks[currentTrackIndex].title} - {currentUserTracks[currentTrackIndex].album.substr(0, 10) + "..." ?? ""}
                                                </h3>
                                            </div>
                                            <div className="mt-8 px-5">
                                                <div className="w-full bg-whitish_border h-[3px]">
                                                    <div className={`bg-accent_blue h-full rounded-full`}
                                                         style={{width: `${((currentTrackIndex + 1) / 3) * 100}%`}}></div>
                                                    <div
                                                        className="mt-2 w-full flex justify-center items-center py-2 gap-x-8">
                                                        <button onClick={() => handleTrackStatusChange("back")}
                                                                disabled={currentTrackIndex <= 0}>
                                                            <Back
                                                                className={`${currentTrackIndex > 0 ? "fill-accent_blue" : "fill-accent_blue/[.2]"}`}/>
                                                        </button>
                                                        <button
                                                            onClick={() => handleTrackStatusChange(playing ? "pause" : "play")}>
                                                            {playing ? (
                                                                <Pause
                                                                    className={"fill-accent_blue w-[18px] h-[18px]"}/>
                                                            ) : (
                                                                <Player
                                                                    className={"fill-accent_blue w-[18px] h-[18px]"}/>
                                                            )}
                                                        </button>
                                                        <button onClick={() => handleTrackStatusChange("next")}
                                                                disabled={currentTrackIndex >= currentUserTracks.length - 1}>
                                                            <Back
                                                                className={`${
                                                                    currentTrackIndex >= currentUserTracks.length - 1 ? "fill-accent_blue/[.2]" : "fill-accent_blue"
                                                                } rotate-[180deg]`}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Card>
                            <Card loading={false} additionalClasses={cardStyle}>
                                <div className=" w-full h-full flex flex-col gap-y-2 relative">
                                    <>
                                        {flipped ? (
                                            <>
                                                <div
                                                    className="h-[26%] w-full flex items-center justify-start gap-x-2 px-3">
                                                    <Image
                                                        src={iterableUsers[index].profile_picture}
                                                        alt="profile picture"
                                                        className="rounded-full w-[33px] h-[33px]"
                                                        width={33}
                                                        height={33}
                                                        objectFit="cover"
                                                    />
                                                    <div className="flex flex-col">
                                                        <h2 className="text-[14px] font-medium">{iterableUsers[index].first_name}</h2>
                                                        <h3 className="text-[12px]">
                                                            {iterableUsers[index].age} ans -{" "}
                                                            {iterableUsers[index].distance < 5 ? "Très proche" : `${iterableUsers[index].distance} km`}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div className="flex px-3">
                                                    <p className="text-black text-[13px]">{iterableUsers[index].bio}</p>
                                                </div>
                                                <div
                                                    className="mt-2 text-[14px] font-medium text-center flex flex-grow items-end justify-center">
                                                    <div className="w-full flex items-center justify-center h-[67px]">
                                                        <button
                                                            onClick={() => setFlipped(false)}
                                                            className="transition-colors duration-200 font-semibold flex items-center justify-center relative bottom-3">
                                                            <Flip classes="stroke-accent_blue w-[20px] h-[20px]"
                                                                  strokeWidth={2.5}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="h-[50%] flex items-end justify-center">
                                                    <Image
                                                        src={iterableUsers[index].profile_picture}
                                                        alt="profile picture"
                                                        className="rounded-full max-md:rounded-[9px] w-[95px] h-[95px]"
                                                        width={95}
                                                        height={95}
                                                        objectFit="cover"
                                                        priority
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-y-1 text-center h-[30%]">
                                                    <h2 className="font-semibold" style={{
                                                        fontFamily: montserrat.style.fontFamily,
                                                        fontWeight: 600
                                                    }}>
                                                        {iterableUsers[index].first_name}
                                                    </h2>
                                                    <h3 className="text-[12px] font-medium">
                                                        {iterableUsers[index].age} ans -{" "}
                                                        {iterableUsers[index].distance < 5 ? "Très proche" : `${iterableUsers[index].distance} km`}
                                                    </h3>
                                                </div>
                                                <div className="w-full flex items-center justify-center">
                                                    <button
                                                        onClick={() => setFlipped(true)}
                                                        className="transition-colors duration-200 font-semibold flex items-center justify-center relative bottom-3">
                                                        <Flip
                                                            classes={`${swipeDirection > 20 ? "stroke-white" : "stroke-accent_blue "} w-[20px] h-[20px]`}
                                                            strokeWidth={2.5}/>
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </>
                                </div>
                            </Card>
                        </div>
                        <div
                            className="w-full max-md:w-[270px] h-[40px] flex flex-row items-center justify-between gap-x-2 text-[14px] font-semibold">
                            <button className="w-1/3 h-full bg-white rounded-[9px] border border-whitish_border"
                                    onClick={() => handleUserAction("swipe")}>
                                <span className="max-md:hidden">Suivant</span>
                                <div className="flex items-center justify-center">
                                    <Back className="fill-accent_blue rotate-[180deg] md:hidden"/>
                                </div>
                            </button>
                            <button className="w-1/3 h-full bg-white rounded-[9px] border border-whitish_border"
                                    ref={buttonRef}
                                    onClick={(e) => handleUserAction("like", false, e)}>
                                <span className="max-md:hidden">J'aime</span>
                                <div className="flex items-center justify-center md:hidden">
                                    <Player className={"fill-accent_blue w-[18px] h-[18px]"}/>
                                </div>
                            </button>
                            <button
                                className="w-1/3 h-full bg-white rounded-[9px] border border-whitish_border"
                                onClick={e => {
                                    e.stopPropagation();
                                    setModalOpen(true);
                                }}>
                                <span className="max-md:hidden">Signaler</span>
                                <div className="flex items-center justify-center md:hidden">
                                    <Report classes={"stroke-accent_blue w-[18px] h-[18px] rotate-[180deg]"}
                                            strokeWidth={2}/>
                                </div>
                            </button>
                        </div>
                        <div className="md:hidden flex flex-grow flex-1 h-full"></div>
                        <div
                            className="md:hidden w-full bg-white border border-whitish_border rounded-[9px] m-auto">
                            <div className="relative w-full flex flex-row justify-between overflow-hidden">
                                <div className="px-2 absolute bottom-0 w-full">
                                    <div className="h-[2px] bg-accent_blue/[.12]">
                                        <div
                                            className={`bg-accent_blue h-[2px] rounded-full absolute w-full bottom-0`}
                                            style={{width: `${((currentTrackIndex + 1) / 3) * 100}%`}}></div>
                                    </div>
                                </div>
                                <div className="w-[50%] flex items-center justify-start px-2 gap-x-2  py-[12px]">
                                    <Image
                                        src={currentUserTracks[currentTrackIndex].image}
                                        alt="profile picture"
                                        className="rounded-[6px]"
                                        width={45}
                                        height={45}
                                        objectFit="cover"
                                        priority
                                    />
                                    <div className="flex flex-col text-center items-start">
                                        <h2 className="text-[13px] font-semibold">{currentUserTracks[currentTrackIndex].title}</h2>
                                        <h3 className="text-[12px] font-regular text-gray_border"
                                            style={{fontFamily: montserrat.style.fontFamily, fontWeight: 400}}>
                                            {currentUserTracks[currentTrackIndex].artist}
                                        </h3>
                                    </div>
                                </div>
                                <div className="w-[50%] flex items-center justify-end px-2 gap-x-2  py-[8px]">
                                    <div className="flex flex-col text-center items-start">
                                        <div
                                            className="mt-2 w-full flex justify-center items-center py-2 pr-3 gap-x-6">
                                            <button onClick={() => handleTrackStatusChange("back")}
                                                    disabled={currentTrackIndex <= 0}>
                                                <Back
                                                    className={`${currentTrackIndex > 0 ? "fill-accent_blue" : "fill-accent_blue/[.2]"}`}/>
                                            </button>
                                            <button
                                                onClick={() => handleTrackStatusChange(playing ? "pause" : "play")}>
                                                {playing ? (
                                                    <Pause className={"fill-accent_blue w-[18px] h-[18px]"}/>
                                                ) : (
                                                    <Player className={"fill-accent_blue w-[18px] h-[18px]"}/>
                                                )}
                                            </button>
                                            <button onClick={() => handleTrackStatusChange("next")}
                                                    disabled={currentTrackIndex >= currentUserTracks.length - 1}>
                                                <Back
                                                    className={`${
                                                        currentTrackIndex >= currentUserTracks.length - 1 ? "fill-accent_blue/[.2]" : "fill-accent_blue"
                                                    } rotate-[180deg]`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col gap-y-4">
                        <div className="max-md:hidden">
                            <MeetUsersLoading size={2}/>
                        </div>
                        <div className="md:hidden">
                            <MeetUsersLoading size={1}/>
                        </div>
                        <div
                            className="bg-accent_blue/[.10] px-2 border border-whitish_border w-full h-[50px] rounded-[9px] flex items-center justify-center font-medium text-[14px] text-accent_blue text-center">
                            {message ?? "Pas de profils à afficher pour le moment"}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
