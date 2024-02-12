"use client";

import { ReactPortal, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Polygon from "../UI/Modal/Polygon";
import Cross from "../Icons/Cross";
import Loader from "../Icons/Loader";
import { getCookie } from "cookies-next";

export default function TopBarChatActions({ fullName, uid }: { fullName: string, uid: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

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
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/matches/delete/${uid}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getCookie("token")}`,
        "Content-type": "Application/json"
      }
    });

    const data = await response.json();

  }

  const modal: ReactPortal | null = open
    ? createPortal(
        <Polygon additionalClasses={`w-[500px] max-md:w-[96%] max-md:rounded-[7px]`} onClickEvent={() => setOpen(false)} closable>
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-bold">{fullName} </h3>
            <button onClick={() => setOpen(false)} className="border p-1 rounded-[6px]">
              <Cross classes="w-4 h-4 text-subtitle_foreground" />
            </button>
          </div>
          <div className="h-[250px] font-semibold text-[14px]">
            <button className="h-[calc(100%/4)] w-full">Voir le profil</button>
            <button
              onClick={e => {
                e.stopPropagation();
                setOpen(false);
                setMatchModalOpen(true);
              }}
              className="h-[calc(100%/4)] w-full border-t ">
              Rompre le match
            </button>
            <button className="h-[calc(100%/4)] w-full border-t ">Signaler</button>
            <button className="h-[calc(100%/4)] w-full border-t ">Bloquer</button>
          </div>
        </Polygon>,
        document.body
      )
    : null;

  const matchModal: ReactPortal | null = matchModalOpen
    ? createPortal(
        <Polygon additionalClasses={`w-[500px] max-md:w-[96%] max-md:rounded-[7px]`} onClickEvent={() => setMatchModalOpen(false)} closable>
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-bold select-none">Rompre avec {fullName} </h3>
            <button onClick={() => setMatchModalOpen(false)} className="border p-1 rounded-[6px]">
              <Cross classes="w-4 h-4 text-subtitle_foreground" />
            </button>
          </div>
          <div className="font-semibold text-[14px] py-6 px-4">
            <h1 className="select-none">Pour confirmer, tape "{fullName}" dans la boite ci-dessous</h1>
            <input
              type="text"
              className="w-full border outline-none h-[36px] my-2 px-2 rounded-[9px] focus:border-black transition-all duration-200"
              onChange={e => handleChange(e)}
              spellCheck={false}
            />

            <button
              className={`px-5 py-2 bg-black text-white rounded-[9px] mt-1 ${
                disabled && "opacity-50 cursor-not-allowed transition-all duration-200"
              }`}
              disabled={disabled}
              onClick={breakMatch}>
              {loading ? <Loader /> : "Rompre"}
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
