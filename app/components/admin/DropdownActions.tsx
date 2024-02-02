import { useEffect, useRef, useState } from "react";
import { AdminModalsBan, AdminModalsDelete } from "./AdminModals";
import { useRouter } from "next/navigation";

type OptionType = {
  label: string;
  action?: (row: any, href: string, router: any) => void;
  href: string;
  required?: string;
};

interface DropdownActionsProps {
  options: OptionType[];
  row: any;
}

export default function DropdownActions({ options, row }: DropdownActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [banHref, setBanHref] = useState<string>("");
  const router = useRouter();

  const handleOptionClick = (option: OptionType) => {
    setIsOpen(false);
    if (option.required === "ban") {
      setIsBanModalOpen(true);
      setBanHref(option.href);
    } else if (option.required === "delete") {
      setIsDeleteModalOpen(true);
      setBanHref(option.href);
    } else {
      option.action?.(row, option.href, router);
    }
  };

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current) {
        if (!ref.current.contains(event.target) as boolean) {
          setIsOpen(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 relative"
        id="options-menu"
        onClick={() => setIsOpen(!isOpen)}>
        ...
      </button>

      {isOpen && (
        <div className="z-50 fixed min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md" ref={ref}>
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {isBanModalOpen && <AdminModalsBan row={row} href={banHref} onClose={() => setIsBanModalOpen(false)} />}
      {isDeleteModalOpen && <AdminModalsDelete row={row} href={banHref} onClose={() => setIsDeleteModalOpen(false)} />}
    </div>
  );
}
