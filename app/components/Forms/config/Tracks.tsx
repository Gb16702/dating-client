import Button from "../../UI/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import Searchbar, { Data } from "../../UI/Searchbar";
import { createPortal } from "react-dom";
import { ChangeEvent, MutableRefObject, ReactPortal, useCallback, useEffect, useRef, useState } from "react";
import Polygon from "../../UI/Modal/Polygon";
import Muscial from "../../Icons/Musical";
import { stopPlayingTrack } from "../../UI/Searchbar";
import Image from "next/image";

type TracksProps = {
  sessionId: string | undefined;
  setAchieved: (b: boolean) => void;
  onTrackChange: (data: any) => void;
  initialTracks: any;
};

async function fetcher(sessionId: TracksProps["sessionId"], search: string) {
  if (!search || !search.trim().length) return;
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/users/spotify/all?query=${search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionId}`,
    },
  });
  const { tracks: data } = await response.json();
  return data;
}

export default function Tracks({ sessionId, setAchieved, onTrackChange, initialTracks }: TracksProps): JSX.Element {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTracks, setSelectedTracks] = useState<any[]>([]);

  const audioRef: MutableRefObject<HTMLAudioElement | null> = useRef<HTMLAudioElement | null>(null);

  const {
    register,
    handleSubmit,
    unregister,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<any>();

  function handleModalClick(type: "open" | "close", e?: ChangeEvent<HTMLInputElement>) {
    if (type === "open") {
      e?.stopPropagation();
      setActive(true);
    } else {
      setActive(false);
      stopPlayingTrack(audioRef);
    }
  }

  const onSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [search]
  );

  useEffect(() => {
    setLoading(true);
    fetcher(sessionId, search)
      .then(data => {
        setSearchResults(data);
        setTimeout(() => setLoading(false), 750);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [onSearch]);

  useEffect(() => {
    setSelectedTracks(initialTracks);
    for (let i = 0; i < initialTracks.length; i++) {
      setValue(`selectedTracks[${i}]`, initialTracks[i]);
    }
  }, [initialTracks]);

  function onKeyDownHandler(e: KeyboardEvent, limit: number, navigationIndex: number, setNavigationIndex: (n: number) => void) {
    if (e.key === "Escape") {
      setActive(false);
      stopPlayingTrack(audioRef);
    } else if (e.key === "Enter") {
      if (searchResults && searchResults.length > 0) handleSelectTrack(searchResults[navigationIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (navigationIndex < limit - 1) setNavigationIndex(navigationIndex + 1);
    } else if (e.key === "ArrowUp") {
      if (navigationIndex > 0) setNavigationIndex(navigationIndex - 1);
    }
  }

  function handleSelectTrack(track: any) {
    setSelectedTracks(prev => {
      const isExistingTrack = prev.some(t => t.id === track.id);
      if (isExistingTrack) return prev.filter(t => t.id !== track.id);
      return prev.length === 3 ? prev : [...prev, track];
    });
    clearErrors("selectedTracks");
  }

  function isSelectedTrack({ id }: any): boolean {
    return selectedTracks.some(t => t.id === id);
  }

  const modal: ReactPortal | null = active
    ? createPortal(
        <Polygon
          additionalClasses={`w-[500px] max-sm:w-[96%] max-sm:rounded-[7px]  ${
            searchResults && searchResults.length > 0 ? "min-h-[606px] max-sm:min-h-[570px]" : "h-fit"
          }`}
          onClickEvent={() => handleModalClick("close")}
          closable>
          <Searchbar
            onSearch={onSearch}
            onSelect={handleSelectTrack}
            search={search}
            setSearch={setSearch}
            data={searchResults}
            loading={loading}
            onKeyDownHandler={onKeyDownHandler}
            isSelectedHandler={isSelectedTrack}
            audioRef={audioRef}
          />
        </Polygon>,
        document.body
      )
    : null;

  const onSubmit: SubmitHandler<any> = () => {
    onTrackChange(selectedTracks);
    setAchieved(true);
  };

  return (
    <>
      {modal}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-[450px] max-sm:w-full pt-[20px] gap-y-3">
          {selectedTracks.map((track, index) => (
            <div key={track.id} className="flex flex-row gap-x-2 py-2 rounded-[12px]">
              <input {...register(`selectedTracks[${index}]`)} type="hidden" value={track} />
              <Image src={track.image} alt={track.title} width={70} height={70} className="w-[70px] h-[70px] rounded-[7px]" />
              <div className={`flex flex-col justify-between`}>
                <div>
                  <h2 className="font-semibold">{track.title.length > 30 ? `${track.title.slice(0, 40)}...` : track.title}</h2>
                  <p className="text-long_foreground text-[13px]">
                    {track.artist} • {track.album.length > 30 ? `${track.album.slice(0, 40)}...` : track.album}
                  </p>
                </div>
                <button
                  type="button"
                  className="w-fit text-[12px] text-accent font-medium"
                  onClick={() => {
                    setSelectedTracks(prev => prev.filter(t => t.id !== track.id));
                    unregister(`selectedTracks[${index}]`);
                  }}>
                  <p>Retirer de la liste</p>
                </button>
              </div>
            </div>
          ))}
          {selectedTracks.length != 3 && (
            <button
              type="button"
              className="w-full h-[70px] rounded-[7px] bg-whitish_background border border-whitish_border flex items-center justify-center"
              onClick={(e: any) => handleModalClick("open", e)}>
              <Muscial classes="w-[25px] h-[25px] fill-gray_border stroke-none" />
            </button>
          )}
        </div>
        {errors.selectedTracks && errors.selectedTracks.message == "Required" && (
          <p className="text-red-500 text-sm font-medium mt-3">{"Vous devez choisir au moins une piste"}</p>
        )}
        <div className="flex gap-x-2 items-center mt-4">
          <Button
            variant={`${!!errors?.selectedTracks ? "error" : "default"}`}
            customClasses="rounded-[9px] font-bold px-[25px] max-md:w-[100%]"
            disabled={!!errors?.selectedTracks}>
            Continuer
          </Button>
        </div>
      </form>
    </>
  );
}
