"use client";

import { Montserrat } from "next/font/google";
import Navigation from "./Navigation/Navigation";
import Thumbnail from "../UI/Thumbnail";
import { useSessionStore } from "../../stores/sessionStore";
import { useEffect, useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "600",
});

export default function Sidebar() {
  const { currentSession } = useSessionStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentSession) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [currentSession]);

  const properties = {
    token: currentSession?.token,
    is_admin: currentSession?.is_admin,
    username: currentSession?.profile?.first_name,
    avatar: currentSession?.profile?.profile_picture,
  };
  
  return (
    <section className="bg-white min-w-[280px] h-screen border-r border-whitish_border flex flex-col">
      <div className="flex items-center h-[8%] px-8">
        <h1 className={`text-[18px] ${montserrat.className}`}>HARMONY</h1>
      </div>
      <div className="h-[84%] flex items-center justify-center flex-col w-full px-6 border-y border-whitish_border">
        <Navigation isAdmin={true} />
      </div>
      <div className="flex items-center h-[8%] px-8">
        <Thumbnail properties={properties} loading={loading} />
      </div>
    </section>
  );
}
