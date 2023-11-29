"use client";

import { useState } from "react";
import Loader from "./Icons/Loader";

export default function Button({
  children,
  variant,
  width,
  loadable,
}: ButtonInterface): JSX.Element {
  const [loading, setLoading] = useState(false);

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
        className={`font-medium text-[12px] px-2 h-[40px] rounded-[9px] flex justify-center items-center relative transition-colors duration-300 ${variant}
        `}
        onClick={loadable ? () => setLoading(true) : undefined}
        disabled={loading}
      >
        {loadable && loading ? <Loader /> : children}
      </button>
    </>
  );
}
