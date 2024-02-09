"use client";

import Link from "next/link";
import { Spotify } from "../Icons/SocialIcons";
import Button from "../UI/Button";
import { useEffect } from "react";

export default function SocialAuth(): JSX.Element {

  return (
    <div className="flex items-center flex-row justify-between gap-x-4 mt-[20px]">
      <Button variant="social" customClasses="rounded-[9px] w-full">
        <a href="http://localhost:20000/api/authentication/redirect" className="w-full h-full flex items-center justify-center">
          <Spotify />
        </a>
      </Button>
    </div>
  );
}
