"use client";

import type { ReactNode } from "react";

export default function Button({variant, children, disabled, customClasses, onClick}: ButtonType & { children: ReactNode }): JSX.Element {
  let buttonBackground: Record<ButtonType["variant"], Record<string, string>> = {
    default: {
      backgroundColor: "black",
      color: "white",
      hover: "zinc-900",
    },
    error: {
      backgroundColor: "#FF000075",
      color: "#FFF",
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
  };

  return (
    <>
      <button
        style={dynamicButtonStyles}
        disabled={disabled}
        className={`text-[12px] px-2 h-[40px] flex justify-center items-center relative transition-colors duration-300 ${variant} ${customClasses}
        `}
        onClick={onClick}
        >
        {children}
      </button>
    </>
  );
}
