"use client";

import { ReactPortal, useCallback, useEffect, useRef, useState } from "react";
import MeetUsersLoading from "./MeetUsersLoading";
import Card from "./Card";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Player from "../Icons/Tracks/Player";
import Back from "../Icons/Tracks/Back";
import Pause from "../Icons/Tracks/Pause";
import Polygon from "../UI/Modal/Polygon";
import { createPortal } from "react-dom";

type MeetUsersProps = {
  token: string | undefined;
};

const montserrat = Montserrat({
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

  const { users, message } = await response.json();
  return { users, response: { status: response.status, message } };
}

async function sendUserAction(token: MeetUsersProps["token"], userId: string, action: "swipe" | "like") {
  let data;
  action === "swipe" ? (data = { swiped_id: userId }) : (data = { liked_id: userId });

  const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/${action}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export default function MeetUsers({ token }: MeetUsersProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(0);
  const [index, setIndex] = useState(0);
  const [iterableUsers, setIterableUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<any>(0);
  const [playing, setPlaying] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentUserTracks = iterableUsers[index]?.tracksData || [];

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const { users: data, response } = await loadUsers(token, page);
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

  if (loading) {
    return (
      <div className="flex flex-col gap-y-4">
        <MeetUsersLoading size={2} />
      </div>
    );
  }

  const handleUserAction = async (action: "swipe" | "like") => {
    if (index < iterableUsers.length) {
      const userId = iterableUsers[index].id;
      await sendUserAction(token, userId, action);
      setIndex(prevIndex => prevIndex + 1);
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

  console.log(iterableUsers[index]);

  const modal: ReactPortal | null = modalOpen
    ? createPortal(
        <Polygon additionalClasses={`w-[500px] max-sm:w-[96%] max-sm:rounded-[7px]`} onClickEvent={undefined} closable>
          x
        </Polygon>,
        document.body
      )
    : null;

  return (
    <>
      {modal}
      {loading ? (
        <MeetUsersLoading size={2} />
      ) : iterableUsers.length > 0 ? (
        <>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row justify-center items-center gap-x-2">
              <Card loading={false}>
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
                        <h2 className="font-semibold" style={{ fontFamily: montserrat.style.fontFamily, fontWeight: 600 }}>
                          {currentUserTracks[currentTrackIndex].artist}
                        </h2>
                        <h3 className="text-[12px] font-medium">
                          {currentUserTracks[currentTrackIndex].title} - {currentUserTracks[currentTrackIndex].album ?? ""}
                        </h3>
                      </div>
                      <div className="mt-8 px-5">
                        <div className="w-full bg-whitish_border h-[3px]">
                          <div className={`bg-accent_blue h-full rounded-full`} style={{ width: `${((currentTrackIndex + 1) / 3) * 100}%` }}></div>
                          <div className="mt-2 w-full flex justify-center items-center py-2 gap-x-8">
                            <button onClick={() => handleTrackStatusChange("back")} disabled={currentTrackIndex <= 0}>
                              <Back className={`${currentTrackIndex > 0 ? "fill-accent_blue" : "fill-accent_blue/[.2]"}`} />
                            </button>
                            <button onClick={() => handleTrackStatusChange(playing ? "pause" : "play")}>
                              {playing ? (
                                <Pause className={"fill-accent_blue w-[18px] h-[18px]"} />
                              ) : (
                                <Player className={"fill-accent_blue w-[18px] h-[18px]"} />
                              )}
                            </button>
                            <button onClick={() => handleTrackStatusChange("next")} disabled={currentTrackIndex >= currentUserTracks.length - 1}>
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
              <Card loading={false}>
                <div className=" w-full h-full flex flex-col gap-y-2">
                  <>
                    {flipped ? (
                      <>
                        <div className="h-[26%] w-full flex items-center justify-start gap-x-2 px-3">
                          <Image
                            src={iterableUsers[index].profile_picture}
                            alt="profile picture"
                            className="rounded-full"
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
                        <div className="mt-2 text-[14px] font-medium text-center flex flex-grow items-end justify-center">
                          <div className="h-[50px]">
                            <button onClick={() => setFlipped(false)} className="text-black hover:text-accent_blue transition-colors duration-200">
                              Retour
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
                            className="rounded-full"
                            width={95}
                            height={95}
                            objectFit="cover"
                            priority
                          />
                        </div>
                        <div className="flex flex-col gap-y-1 text-center h-[30%]">
                          <h2 className="font-semibold" style={{ fontFamily: montserrat.style.fontFamily, fontWeight: 600 }}>
                            {iterableUsers[index].first_name}
                          </h2>
                          <h3 className="text-[12px] font-medium">
                            {iterableUsers[index].age} ans -{" "}
                            {iterableUsers[index].distance < 5 ? "Très proche" : `${iterableUsers[index].distance} km`}
                          </h3>
                        </div>
                        <div className="mt-2 text-[14px] font-medium text-center flex items-center justify-center h-[20%] border-t border-whitish_border">
                          <button onClick={() => setFlipped(true)} className="text-accent_blue transition-colors duration-200 font-semibold">
                            Voir la bio
                          </button>
                        </div>
                      </>
                    )}
                  </>
                </div>
              </Card>
            </div>

            <div className="w-full h-[40px] flex flex-row items-center justify-between gap-x-2 text-[14px] font-semibold">
              <button className="w-1/3 h-full bg-white rounded-[9px] border border-whitish_border" onClick={() => handleUserAction("swipe")}>
                <span>Suivant</span>
              </button>
              <button className="w-1/3 h-full bg-white rounded-[9px] border border-whitish_border" onClick={() => handleUserAction("like")}>
                <span>J'aime</span>
              </button>
              <button className="w-1/3 h-full bg-white rounded-[9px] border border-whitish_border" onClick={() => setModalOpen(true)}>
                <span>Signaler</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-y-4">
            <div className="max-sm:hidden">
              <MeetUsersLoading size={2} />
            </div>
            <div className="sm:hidden">
              <MeetUsersLoading size={1} />
            </div>
            <div className="bg-accent_blue/[.10] border border-whitish_border w-full h-[50px] rounded-[9px] flex items-center justify-center font-medium text-[14px] text-accent_blue">
              {message ?? "Pas de profils à afficher pour le moment"}
            </div>
          </div>
        </>
      )}
    </>
  );
}
