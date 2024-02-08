import { FC, ForwardedRef, forwardRef } from "react";

type InputPropsType = {
  ariaLabel: string;
  name?: string;
  placeholder?: string;
  type: string;
  width?: string;
  additionalClasses?: string;
  id?: string;
};

const Input: FC<InputPropsType> = forwardRef<HTMLInputElement, InputPropsType>(
  ({ ariaLabel, type, name, placeholder, width, additionalClasses, id, ...props }: InputPropsType, ref: ForwardedRef<HTMLInputElement>) => {
    const DEFAULT_CLASSES: string = `placeholder-subtitle_foreground bg-transparent font-medium text-[12px] text-black outline-none h-full ${
      width ?? "w-auto"
    }`;

    return (
      <input
        type={type}
        ref={ref}
        className={`${DEFAULT_CLASSES} ${additionalClasses}`}
        name={name}
        placeholder={placeholder}
        id={id}
        width={width}
        autoComplete="off"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
