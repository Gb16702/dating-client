import { ReactNode } from "react";
import * as Label from "./Label";

type InputGroupProps = {
  width?: string;
  name?: Label.LabelProps["name"];
  children: ReactNode;
};

function InputGroup({ children, name, width }: InputGroupProps) {
  return (
    <>
      <div
        className="outline outline-1 outline-whitish_border h-[40px] flex items-center px-2 text-sm rounded-[9px] relative transition-all duration-300 focus-within:outline-black"
        style={{
          marginTop: name && "4px",
          width: width ?? "100%",
        }}
      >
        {children}
      </div>
    </>
  );
}

export default InputGroup;
