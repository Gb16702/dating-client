import Background from "./Background";
import type { ReactNode, RefObject } from "react";
import { useEffect, useRef } from "react";

export default function Polygon({
  children,
  closable,
}: { children: ReactNode } & { closable?: boolean }) {
  const polygonRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  function isHTMLElement(target: EventTarget): target is HTMLElement {
    return target instanceof HTMLElement;
  }

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      if (target && isHTMLElement(target)) {
        if (polygonRef.current && !polygonRef.current.contains(target)) {
          console.log("clicked outside");
        }
      }
    };

    if (!closable) return;

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <Background />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white z-20 rounded-[12px] p-4"
        ref={polygonRef}
      >
        {children}
      </div>
    </>
  );
}
