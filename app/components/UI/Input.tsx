import { FC, ForwardedRef, forwardRef } from "react";

type InputPropsType = {
  ariaLabel: string;
  name?: string;
  placeholder?: string;
  type: string;
  id?: string;
};

const Input: FC<InputPropsType> = forwardRef<HTMLInputElement, InputPropsType>(
  (
    { ariaLabel, type, name, placeholder, id, ...props }: InputPropsType,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const DEFAULT_CLASSES: string =
      "placeholder-subtitle_foreground font-medium text-[12px] text-black outline-none w-full h-full";

    return (
      <input
        type={type}
        ref={ref}
        className={DEFAULT_CLASSES}
        name={name}
        placeholder={placeholder}
        id={id}
        autoComplete="off"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
