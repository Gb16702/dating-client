import Image from "next/image";
import React from "react";

export default function NavBar() {
  return (
    <header className="w-full h-[80px] border-b border-whitish_border bg-white px-8">
      <div className="flex items-center justify-end h-full">
        <Image
          src="https://media.licdn.com/dms/image/C4E03AQEL4iulX7h2Wg/profile-displayphoto-shrink_800_800/0/1516922545819?e=1711584000&v=beta&t=wKda_ECyXVm4CPy8G3AmMJ6cVBnH8jxINY-XRMnvVic"
          width={40}
          height={40}
          alt="Avatar"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
      </div>
    </header>
  );
}
