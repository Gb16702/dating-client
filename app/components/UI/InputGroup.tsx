import { ReactNode } from "react";
import * as Label from "./Label";

type InputGroupProps = {
  width?: string;
  name?: Label.LabelProps["name"];
  children: ReactNode;
  outlineColor?: string;
  onClick?: () => void;
};

function InputGroup({ children, name, width, outlineColor, onClick }: InputGroupProps) {
  return (
    <>
      <div
        className={`outline outline-1 h-[40px] flex items-center px-2 text-sm rounded-[9px] relative transition-all duration-300 focus-within:outline-black ${outlineColor ?? "outline-whitish_border"}`}
        style={{
          marginTop: name && "4px",
          width: width ?? "100%",
        }}
        onClick={onClick}>
        {children}
      </div>
    </>
  );
}

export default InputGroup;
