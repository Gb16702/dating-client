"use client";

import GeneratePassword from "../utils/generatePassword";
import Sparkles from "./Icons/Sparkles";

import { ChangeEvent, FC, useCallback, useState } from "react";
import { Eye, EyeOff } from "./Icons/EyeIcons";

const PasswordInput: FC<PasswordInputProps & { className: string }> = ({
  placeholder,
  name,
  className,
}: PasswordInputProps & { className: string }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleClick: () => void = useCallback(
    () => setVisible((v: boolean) => !v),
    []
  );
  const generatePassword: () => void = useCallback(
    () => setValue(GeneratePassword(12)),
    []
  );

  return (
    <>
      <input
        aria-label="Mot de passe"
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        name={name}
        value={value}
        className={className}
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
          setValue(value)
        }
      />
      <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center gap-x-2">
        <button
          aria-label="Générer un mot de passe"
          type="button"
          onClick={generatePassword}
        >
          <Sparkles />
        </button>
        <button
          aria-label="Afficher / Masquer le mot de passe"
          type="button"
          onClick={handleClick}
        >
          {visible ? <EyeOff /> : <Eye />}
        </button>
      </div>
    </>
  );
};

const Input: FC<InputProps> = ({
  type,
  placeholder,
  name,
  ariaLabel,
  width,
  label,
}: InputProps) => {
  const DEFAULT_CLASSES: string =
    "placeholder-subtitle_foreground font-medium text-[12px] text-black outline-none w-full h-full";

  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="text-[12px] font-medium text-subtitle_foreground"
        >
          {label}
        </label>
      )}
      <div
        className="border border-whitish_border h-[40px] flex items-center px-2 text-sm rounded-[9px] relative"
        style={{
          width: width ?? "100%",
          marginTop: label && "2px",
        }}
      >
        {type === "password" ? (
          <PasswordInput
            placeholder={placeholder}
            name={name}
            className={DEFAULT_CLASSES}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            aria-label={ariaLabel}
            className={DEFAULT_CLASSES}
          />
        )}
      </div>
    </>
  );
};

export default Input;
