"use client"

import { useState } from "react";
import Bars from "../Icons/Feed/Bars";

export default function Feed() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <>
      <section className={`bg-white ${open ? "min-w-[280px]" : "w-[70px]" } h-screen border-l border-whitish_border flex flex-col`}>
        <div className="flex items-center h-[8%] px-8"></div>
        <div className="h-[84%] flex items-center justify-center flex-col w-full px-6 border-y border-whitish_border"></div>
        <div className="flex items-center h-[8%] justify-center">
          <button onClick={handleClick}>
            <Bars classes="w-[24px] h-[24px] stroke-black" />
          </button>
        </div>
      </section>
    </>
  );
}
