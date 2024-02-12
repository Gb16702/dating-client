"use client";

import {ChangeEvent, MutableRefObject, useState} from "react";
import Cross from "../Icons/Cross";
import {Arrow, Select} from "../Icons/keyboard/Interactions";
import Dv from "./Skeletons/Dv";
import Chevron from "../Icons/Chevron";
import Listening from "../Icons/Listening";
import Image from "next/image";

type SearchbarProps = {
    onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    setSearch: (value: string) => void;
    search: string;
    data: Data[];
    loading: boolean;
    onKeyDownHandler: (e: KeyboardEvent, limit: number, navigationIndex: number, setNavigationIndex: (n: number) => void) => void;
    onSelect: (data: Data) => void;
    isSelectedHandler: ({id}: { id: string }) => boolean;
    audioRef: MutableRefObject<HTMLAudioElement | null>;
};

export type Data = {
    id: string;
    title: string;
    album: string;
    image: string;
    artist: string;
    preview: string;
};

export function stopPlayingTrack(audioRef: MutableRefObject<HTMLAudioElement | null>) {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
}

export default function Searchbar({
                                      onSearch,
                                      onSelect,
                                      setSearch,
                                      search,
                                      data,
                                      loading,
                                      onKeyDownHandler,
                                      isSelectedHandler,
                                      audioRef,
                                  }: SearchbarProps): JSX.Element {
    const skeletonCount = 5;
    const [navigationIndex, setNavigationIndex] = useState<number>(-1);
    const [playingTrack, setPlayingTrack] = useState<string | null>(null);

    function playPreviewUrl(preview: Data["preview"], trackId: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation();

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        if (playingTrack === trackId) {
            setPlayingTrack(null);
        } else {
            audioRef.current = new Audio(preview);
            audioRef.current.volume = 0.04;
            audioRef.current.play();
            setPlayingTrack(trackId);

            audioRef.current.onended = () => {
                setPlayingTrack(null);
            };
        }
    }

    return (
        <>
            <div
                className="flex flex-row items-center p-3 max-sm:px-2 h-[50px] border-b border-whitish_border"
                onKeyDown={(e: any) => onKeyDownHandler(e, data && data?.length, navigationIndex, setNavigationIndex)}>
                <input
                    type="text"
                    placeholder="Recherche un morceau"
                    className="outline-none w-full text-[14px] font-medium px-2 py-1 placeholder:text-subtitle_foreground"
                    onChange={onSearch}
                    autoFocus
                    spellCheck={false}
                    value={search}
                />
                {search && (
                    <button onClick={() => setSearch("")}>
                        <Cross classes={"w-4 h-4"} border={2.5}/>
                    </button>
                )}
            </div>
            {loading ? (
                <div className="flex flex-col gap-y-2 mt-8 p-3 max-sm:p-2">
                    {Array.from({length: skeletonCount}, (_, i) => (
                        <Dv key={i} classes={"w-full h-[75px] bg-whitish_border rounded-[12px] animate-pulse"}/>
                    ))}
                </div>
            ) : (
                data &&
                data.length > 0 && (
                    <div className="text-[14px] mt-2">
                        <h2 className="px-2 pt-1 py-2 font-medium ml-3 mt-1 max-sm:p-1">{data.length} résultats</h2>
                        <div
                            className="flex flex-col gap-y-1 border-b max-sm:border-none p-3 max-sm:p-2 border-whitish_border">
                            {data.map(({id, title, album, image, artist, preview}, index) => (
                                <div
                                    key={id}
                                    onClick={() => onSelect({id, title, album, image, artist, preview})}
                                    className={`flex flex-row gap-x-2 p-2 rounded-[12px] cursor-pointer ${
                                        index === navigationIndex ? "bg-accent/[.08]" : isSelectedHandler({id}) ? "bg-accent/[.08]" : "hover:bg-accent/[.08]"
                                    }`}>
                                    <div className="relative min-w-[70px] min-h-[70px]">
                                        {playingTrack === id ? (
                                            <div
                                                className="w-full h-full rounded-[7px] flex items-center justify-center overflow-hidden">
                                                <Image src={image} alt={title} width={70} height={70}
                                                       className="w-[70px] h-[70px] rounded-[7px]"/>
                                                <div
                                                    className="absolute z-[5] bg-white/[.15] backdrop-blur-[2px] w-full h-full rounded-[7px]"></div>
                                                <Listening/>
                                            </div>
                                        ) : (
                                            <Image src={image} alt={title} width={70} height={70}
                                                   className="w-[70px] h-[70px] rounded-[7px]"/>
                                        )}
                                    </div>
                                    <div className={`flex flex-col justify-between`}>
                                        <div>
                                            <h2 className="font-semibold">{title.length > 30 ? `${title.slice(0, 40)}...` : title}</h2>
                                            <p className="text-long_foreground text-[13px]">
                                                {artist} • {album.length > 30 ? `${album.slice(0, 40)}...` : album}
                                            </p>
                                        </div>
                                        <div
                                            className="flex flex-row items-center gap-x-[6px] text-[12px] w-fit text-accent font-medium">
                                            {preview ? (
                                                <button
                                                    onClick={e => playPreviewUrl(preview, id, e)}>{playingTrack === id ? "Pause" : "Écouter un extrait"}</button>
                                            ) : (
                                                <a
                                                    onClick={e => e.stopPropagation()}
                                                    href={`spotify:track:${id}`}
                                                    target="_blank"
                                                    className="text-[12px] text-accent font-medium"
                                                    rel="noopener noreferrer">
                                                    <div className="flex flex-row items-center gap-x-[6px]">
                                                        <p>Écouter sur Spotify</p>
                                                    </div>
                                                </a>
                                            )}
                                            <Chevron classes={"w-[11px] h-[11px] rotate-[-90deg]"} width={2.5}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            className="w-full flex-row flex gap-x-6 text-[12px] justify-between h-[44px] items-center max-sm:hidden">
                            <div className="flex flex-row h-full w-full">
                                <div
                                    className="flex flex-row items-center  border-whitish_border justify-center px-3 gap-x-2.5 w-1/3">
                                    <button className="flex flex-row items-center justify-center">
                                        <Arrow classes="w-[15px] h-[15px] fill-gray_border stroke-none"/>
                                    </button>
                                    <p className="text-subtitle_foreground font-medium">Déplacer</p>
                                </div>
                                <div
                                    className="flex flex-row items-center border-l border-whitish_border justify-center px-3 gap-x-2.5 w-1/3">
                                    <button className="flex flex-row items-center justify-center">
                                        <Select
                                            classes="w-[15px] h-[15px] fill-gray_border stroke-none rotate-[180deg]"/>
                                    </button>
                                    <p className="text-subtitle_foreground font-medium">Choisir</p>
                                </div>
                                <div
                                    className="flex flex-row items-center border-l border-whitish_border justify-center px-3 gap-x-2.5 w-1/3">
                                    <button className="flex flex-row items-center justify-center">
                                        <small className="text-subtitle_foreground relative top-[1px]">ESC</small>
                                    </button>
                                    <p className="text-subtitle_foreground font-medium">Fermer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
}
