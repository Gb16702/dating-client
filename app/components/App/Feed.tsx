"use client";

import { ReactPortal } from "react";
import { useState } from "react";
import Bars from "../Icons/Feed/Bars";
import { Notifications } from "../Icons/Notifications";
import { createPortal } from "react-dom";
import Polygon from "../UI/Modal/Polygon";
import Cross from "../Icons/Cross";

export default function Feed() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  const modal: ReactPortal | null = modalOpen
    ? createPortal(
        <Polygon additionalClasses={`w-[500px] max-md:w-[96%] max-md:rounded-[7px]`} onClickEvent={() => setModalOpen(false)} closable>
          <div className="flex items-center justify-between border-b border-whitish_border p-4">
            <h2 className="font-bold text-[19px]">Notifications</h2>
            <button onClick={() => setModalOpen(false)} className="border p-1 rounded-[6px]">
              <Cross classes="w-4 h-4 text-subtitle_foreground" />
            </button>
          </div>
          <div className="min-h-[20vh]">
            <div className="h-[20vh] w-full flex items-center justify-center">
              <h2 className="text-center text-sm font-medium text-long_foreground">Vide</h2>
            </div>
          </div>
          <div className="h-[6vh] border-t border-whitish_border w-full">
            <button className="p-4 font-semibold text-sm text-accent_blue tracking-tight" onClick={() => ({})}>
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
      <section className={`bg-white ${open ? "min-w-[280px]" : "w-[70px]"} h-screen border-l border-whitish_border flex flex-col max-md:hidden`}>
        <button
          className="flex items-center justify-center h-[8%] min-w-full"
          onClick={e => {
            e.stopPropagation();
            setModalOpen(true);
          }}>
          <Notifications classes={"w-[22px] h-[22px]"} />
        </button>
        <div className="h-[84%] flex items-center justify-center flex-col w-full border-y border-whitish_border"></div>
        <div className="flex items-center h-[8%] justify-center w-full">
          <button onClick={handleClick}>
            <Bars classes="w-[24px] h-[24px] stroke-black" />
          </button>
        </div>
      </section>
    </>
  );
}
