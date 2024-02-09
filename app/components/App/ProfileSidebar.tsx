"use client";

import ProfileNavigation from "./Navigation/ProfileNavigation";

export default function ProfileSidebar() {
  return (
    <>
      <div className="bg-white border-r border-whitish_border max-w-[400px] h-screen flex flex-grow flex-col">
        <div className="flex items-center h-[calc(8%+1px)] px-8 border-b border-whitish_border">
          <h1 className="font-medium">Ton Profil</h1>
        </div>
        <ProfileNavigation />
      </div>
    </>
  );
}
