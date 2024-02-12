"use client";

import type { ReactNode } from "react";

export default function Card({
  children,
  loading,
  hiddenOnPhoneFormat,
  additionalClasses,
}: {
  children: ReactNode;
  loading?: boolean;
  hiddenOnPhoneFormat?: boolean;
  additionalClasses?: any;
}) {
  return (
    <div
      style={additionalClasses}
      className={`w-[270px] h-[300px] max-md:h-[370px] bg-white border border-whitish_border rounded-[15px] relative overflow-hidden card-container ${
        loading && "animate-pulse"
      } ${hiddenOnPhoneFormat && "max-md:hidden"}`}>
      {children}
    </div>
  );
}
