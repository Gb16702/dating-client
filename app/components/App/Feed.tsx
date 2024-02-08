"use client";

import { useState } from "react";
import Bars from "../Icons/Feed/Bars";
import { Notifications } from "../Icons/Notifications";

export default function Feed() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <>
      <section className={`bg-white ${open ? "min-w-[280px]" : "w-[70px]"} h-screen border-l border-whitish_border flex flex-col max-md:hidden`}>
        <div className="flex items-center justify-center h-[8%] min-w-full">
          <Notifications classes={"w-5 h-5"} />
        </div>
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
