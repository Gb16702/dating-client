"use client";

import type { ReactNode } from "react";


export default function Button({
  variant,
  width,
  children,
  disabled
}: ButtonInterface & { children: ReactNode }): JSX.Element {

  let buttonBackground: Record<
    ButtonInterface["variant"],
    Record<string, string>
  > = {
    default: {
      backgroundColor: "black",
      color: "white",
      hover: "zinc-900",
    },
    error: {
      backgroundColor: "red",
      color: "white",
    },
    social: {
      backgroundColor: "white",
      border: "1px solid #F0F0F0",
    },
  };

  const dynamicButtonStyles = {
    backgroundColor:
      buttonBackground[variant].backgroundColor &&
      buttonBackground[variant].backgroundColor,
    color: buttonBackground[variant].color && buttonBackground[variant].color,
    border:
      buttonBackground[variant].border && buttonBackground[variant].border,
    width: width ?? "auto",
  };

  return (
    <>
      <button
        style={dynamicButtonStyles}
        disabled={disabled}
        className={`font-medium text-[12px] px-2 h-[40px] rounded-[9px] flex justify-center items-center relative transition-colors duration-300 ${variant}
        `}
      >
        {children}
      </button>
    </>
  );
}
