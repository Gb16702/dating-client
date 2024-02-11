"use client";

import { useCallback, useEffect, useState } from "react";
import InputGroup from "../../UI/InputGroup";
import Input from "../../UI/Input";
import type { ConversationsSidebarProps } from "../ConversationsSidebar";
import Image from "next/image";
import Link from "next/link";
import Cross from "../../Icons/Cross";

export default function ConversationsNavigation({ conversations, uid }: ConversationsSidebarProps): JSX.Element {
  const [active, setActive] = useState("tout");
  const [search, setSearch] = useState("");
  const [filteredConversations, setFilteredConversations] = useState(conversations);

  function transformDateToTimeDifferenceFromNow(date: string) {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years + " ans";
    } else if (months > 0) {
      return months + " mois";
    } else if (weeks > 0) {
      return weeks + " semaines";
    } else if (days > 0) {
      return days + " jours";
    } else if (hours > 0) {
      return hours + " heures";
    } else if (minutes > 0) {
      return minutes + " minutes";
    } else if (seconds > 0) {
      return seconds + " secondes";
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleActiveState(cat: string) {
    setActive(cat);
  }

  useEffect(() => {
    let tempConversations = conversations;

    if (active === "favoris") {
      tempConversations = tempConversations.filter(c => c.isFavorite);
    }

    if (search !== "") {
      tempConversations = tempConversations.filter(c => c.profile.first_name.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredConversations(tempConversations);
  }, [active, search, conversations]);

  return (
    <>
      <section className="w-full">
        <div className="h-[73px] px-6 flex items-center gap-x-1 font-medium text-sm">
          <button
            onClick={() => handleActiveState("tout")}
            className={`${active === "tout" ? "outline outline-1 outline-whitish_border" : "text-subtitle_foreground"}  px-5 py-1.5 rounded-[9px]`}>
            Tout
          </button>
          <button
            onClick={() => handleActiveState("favoris")}
            className={`${active === "favoris" ? "outline outline-1 outline-whitish_border" : "text-subtitle_foreground"} px-5 py-1.5 rounded-[9px]`}>
            Favoris
          </button>
        </div>
        <div className="px-6 flex items-center w-full">
          <InputGroup additionalClasses="flex-grow outline-none" focusColor="transparent">
            <input
              onChange={e => handleChange(e)}
              type="text"
              placeholder="Rechercher..."
              className="w-full h-full px-2 text-sm bg-transparent outline-none"
              value={search}
            />
            {search.trim().length > 0 && (
              <button
                onClick={() => {
                  setSearch("");
                  setFilteredConversations(conversations);
                }}
                className="border p-0.5 rounded-[6px]">
                <Cross classes="w-[14px] h-[14px] text-subtitle_foreground" />
              </button>
            )}
          </InputGroup>
        </div>
        {conversations.length === 0 ? (
          <div className="h-[calc(100%-73px)] flex items-center justify-center">
            <h1 className="text-sm font-medium text-black text-center max-w-full break-words px-2">
              <Link className=" text-accent_blue" href={`${process.env.NEXT_PUBLIC_CLIENT}`}>
                Rencontrez des gens pour commencer à discuter
              </Link>
            </h1>
          </div>
        ) : (
          filteredConversations.length === 0 && (
            <div className="h-[calc(100%-73px)] flex items-center justify-center px-4">
              <h3 className="text-sm font-medium text-subtitle_foreground text-center max-w-full break-words">
                Aucun résultat pour cette recherche : <span className="text-accent_blue">{search}</span>
              </h3>
            </div>
          )
        )}
        <div className="w-full flex flex-col gap-y-3 px-3 mt-8">
          {filteredConversations.map((c, i: number) => (
            <Link
              href={`${process.env.NEXT_PUBLIC_CLIENT}/${uid}/conversations/${c.id}`}
              key={i}
              className="py-2 cursor-pointer hover:bg-whitish_background rounded-[9px] px-3">
              <div className="flex gap-x-3">
                <Image src={c.profile.profile_picture} width={50} height={50} alt="Image de profil" className="w-[36px] h-[36px] rounded-full" />
                <div className="flex flex-col w-full gap-y-1">
                  <div className="flex justify-between w-full">
                    <h1 className="font-semibold text-sm">{c.profile.first_name}</h1>
                    <p className="text-xs tracking-tight  text-subtitle_foreground">
                      {`Il y a ${
                        c.lastMessage
                          ? transformDateToTimeDifferenceFromNow(c.lastMessage.created_at)
                          : transformDateToTimeDifferenceFromNow(c.created_at)
                      }`}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-xs font-medium ${
                        c.lastMessage
                          ? c.lastMessage.is_read
                            ? "text-subtitle_foreground"
                            : c.lastMessage.sender_id === uid
                            ? "text-subtitle_foreground"
                            : "text-black"
                          : "text-black"
                      }`}>
                      {c.lastMessage
                        ? c.lastMessage.content.length > 35
                          ? c.lastMessage.content.substr(0, 35) + "..."
                          : c.lastMessage.content
                        : `Aucun message`}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
