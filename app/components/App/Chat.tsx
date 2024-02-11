"use client";

import Send from "../Icons/Send";
import InputGroup from "../UI/InputGroup";

export default function Chat() {
  return (
    <>
      <section className="flex flex-col min-w-full h-full bg-white">
        <div className="min-h-[73px] flex items-center">
          <div className="min-w-full px-2 h-[60%] bg-white"></div>
        </div>
        <div className="h-full w-full px-2 pt-6"></div>
      </section>
      <section className="min-h-[calc((100vh/100)*8)] w-full flex items-center px-10 gap-x-3 bg-white">
        <div className="flex-grow h-[50px] flex gap-x-4">
          <input
            type="text"
            placeholder="Votre message..."
            className="h-full flex flex-grow px-2 text-sm bg-transparent border border-whitish_border rounded-[8px] outline-none"
          />
          <div className="h-full w-[50px] rounded-[8px] border border-whitish_border flex items-center justify-center">
            <Send classes="fill-black w-5 h-5 relative right-[2px] top-[2px]" strokeWidth={6} />
          </div>
        </div>
      </section>
    </>
  );
}
