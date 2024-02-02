"use client";

import React, { useState, useRef, type MutableRefObject, useEffect, useCallback, useMemo, ChangeEvent } from "react";
import Chevron from "../Icons/Chevron";
import Search from "../Icons/Search";
import Checkbox from "./Checkbox";
import Cross from "../Icons/Cross";

type SelectProps = {
  classes?: string;
  placeholder?: string;
  data: Item;
  displayKey?: keyof Item;
  setSelectedValue: (value: any) => void;
  initialValue?: Item;
};

export type CheckState = {
  id: number | null;
  checked: boolean;
  item: string | null;
};

export type Item = {
  [x: string]: any;
};

export default function Select({ classes, placeholder, data, displayKey = "name", setSelectedValue, initialValue }: SelectProps): JSX.Element {
  const searchInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState<CheckState>({
    id: null,
    checked: false,
    item: null,
  });

  useEffect(() => {
    if (initialValue && checked) {
      setChecked({
        id: initialValue.id,
        checked: true,
        item: initialValue.item,
      });
    }
  }, [initialValue]);

  useEffect(() => {
    if (checked.checked) {
      setSelectedValue(checked);
    }
  }, [checked]);

  function sortItemsByAlphabeticalOrder(items: Item): Item[] {
    return items.sort((a: Item, b: Item) => a[displayKey].localeCompare(b[displayKey]));
  }

  const handleClick: (item: Item) => void = useCallback((item: Item) => {
      setChecked((prev) => {
        const isSameItem: boolean = item.id === prev.id;
        const newValue: CheckState = isSameItem
          ? { id: null, checked: false, item: null }
          : { id: item.id, checked: true, item: item[displayKey] };

        setSelectedValue(newValue);

        return newValue;
      });
    }, [displayKey, setSelectedValue]);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearch(e.target.value);
  }

  function handleReset() {
    setSearch("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }

  const sortedData: Item[] = useMemo(() => sortItemsByAlphabeticalOrder(data), [data, sortItemsByAlphabeticalOrder]);
  const filteredData: Item[] = useMemo(() => sortedData.filter(item => {
    return item[displayKey].toLowerCase().includes(search.toLowerCase())
  }), [search, sortedData, displayKey]);

  return (
    <>
      <div
        className={`outline outline-1 outline-whitish_border h-[40px] rounded-[9px] flex items-center justify-between px-3 flex-col ${classes}`}
        onClick={() => setOpen(!open)}>
        <div className="w-full flex flex-row justify-between items-center h-[40px] cursor-pointer">
          <p className={`font-medium text-[14px] outline-none text-subtitle_foreground`}>{checked.item ?? placeholder}</p>
          <input type="hidden" value={checked.item || ""} />
          <Chevron classes={`w-[15px] h-[15px] text-gray_border ${open && "rotate-180"}`} />
        </div>
      </div>
      {open && (
        <>
          <div className="outline outline-1 outline-whitish_border px-3 pt-4 pb-3 rounded-[9px] min-h-fit w-full">
            <div className="px-1">
              <div className="h-[40px] flex flex-row items-center px-2 rounded-[9px] outline-none border border-whitish_border">
                <Search classes="w-4 h-4 text-gray_border" />
                <input
                  className="w-full px-3 text-[14px] placeholder-gray_border outline-none text-gray_border"
                  onChange={e => handleChange(e)}
                  value={search}
                  placeholder="Rechercher"
                  ref={searchInputRef}
                />
                {search && <Cross classes="w-4 h-4 text-gray_border" onClick={handleReset} />}
              </div>
            </div>
            <div className="overflow-y-auto min-h-fit max-h-[180px] mt-4 flex flex-col">
              {filteredData.map((item, i) => (
                <div className={`${checked.id === item.id && "bg-[#00000008]"} px-[6px] rounded-[5px]`} key={item.id}>
                  <div
                    className={`flex flex-row gap-x-4 font-medium text-subtitle_foreground text-[14px] cursor-pointer ${
                      i !== (data && data.length - 1) ? "py-2" : "pt-2"
                    }`}
                    key={i}
                    onClick={() => handleClick(item)}>
                    <Checkbox checked={checked.id === item.id} />
                    <p className={`${checked.id === item.id && "text-black"}`}>{item[displayKey]}</p>
                  </div>
                </div>
              ))}
              {!filteredData.length && <p className="text-sm text-subtitle_foreground">Pas de résultat pour : {search}</p>}
            </div>
          </div>
        </>
      )}
    </>
  );
}
