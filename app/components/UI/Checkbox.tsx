import React, { useState, useEffect } from 'react';

type CheckboxProps = {
  theme?: string;
  onCheck?: () => void;
  checked: boolean;
}

const Checkbox = ({ checked }: CheckboxProps) => {
  const defaultClasses = "absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2 w-full h-full flex items-center justify-center overflow-hidden rounded-[4px]";


  return (
    <div className="relative w-fit h-fit overflow-hidden border rounded-[3px]">
      <div className={`appearance-none rounded-[4px] bg-white overflow-hidden w-4 h-4 checkbox`}></div>
      {checked && (
        <div className={`${defaultClasses} bg-black`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="white" className="w-[70%] h-[70%]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Checkbox;
