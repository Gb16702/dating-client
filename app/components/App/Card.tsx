"use client";

import type { ReactNode } from "react";

export default function Card({ children, loading }: { children: ReactNode, loading?: boolean}) {
  return <div className={`w-[270px] h-[300px] bg-white border border-whitish_border rounded-[15px] relative overflow-hidden card-container ${loading && "animate-pulse"}`}>{children}</div>;
}
