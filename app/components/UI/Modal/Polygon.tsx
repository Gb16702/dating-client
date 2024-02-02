import Background from "./Background";
import type { ReactNode, RefObject } from "react";
import { useEffect, useRef } from "react";

type PolygonProps = {
  children: ReactNode;
  closable?: boolean;
  onClickEvent?: () => void;
  additionalClasses?: string;
  height?: boolean;
};

export function isHTMLElement(target: EventTarget): target is HTMLElement {
  return target instanceof HTMLElement;
}

export default function Polygon({ children, closable, onClickEvent, additionalClasses }: PolygonProps): JSX.Element {
  const polygonRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent): void => {
      if (target && isHTMLElement(target)) {
        if (polygonRef.current && !polygonRef.current.contains(target)) {
          onClickEvent && onClickEvent();
        };
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
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-20 rounded-[12px] overflow-hidden ${additionalClasses}`}
        ref={polygonRef}>
        {children}
      </div>
    </>
  );
}
