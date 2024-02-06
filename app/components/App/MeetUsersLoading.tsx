"use client";

import Card from "./Card";

export default function MeetUsersLoading({ size }: { size: number }): JSX.Element {
  return (
    <>
      <div className="flex justify-center items-center gap-x-2">
        {Array.from({ length: size }, (_, i) => (
          <div key={i}>
            <Card loading={true}>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 rounded-full w-[95px] h-[95px] bg-whitish_background animate-pulse"></div>
              <div className="absolute top-[155px] left-1/2 -translate-x-1/2 rounded-full w-[100px] h-[24px] bg-whitish_background animate-pulse"></div>
              <div className="absolute top-[195px] left-1/2 -translate-x-1/2 rounded-full w-[180px] h-[20px] bg-whitish_background animate-pulse"></div>
            </Card>
          </div>
        ))}
      </div>
      {/* <div className="w-full h-[40px] flex flex-row items-center justify-between gap-x-2">
        <div className="w-1/3 h-full bg-white animate-pulse rounded-[9px] border border-whitish_border"></div>
        <div className="w-1/3 h-full bg-white animate-pulse rounded-[9px] border border-whitish_border"></div>
        <div className="w-1/3 h-full bg-white animate-pulse rounded-[9px] border border-whitish_border"></div>
      </div> */}
    </>
  );
}
