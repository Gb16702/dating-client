"use client";

import { profileSectionStore } from "@/app/stores/profileSectionStore";

type array = {
  name: string;
};

export default function CustomProfileNavigation(): JSX.Element {
  const { active, setActive } = profileSectionStore();

  const array: array[] = [
    {
      name: "Photos",
    },
    {
      name: "Musiques",
    },
  ];

  function isActive(item: string) {
    return active === item;
  }

  return (
    <>
      <section className="flex flex-row w-full bg-white border-b border-whitish_border">
        <>
          {array.map((item: array, i: number) => (
            <button
              key={i}
              className={`${
                isActive(item.name.toLowerCase()) &&
                "border-b border-accent_blue"
              } h-[73px] px-8 flex items-center bg-white`}
              onClick={() => setActive(item.name.toLowerCase())}
            >
              <div>
                <h2
                  className={`text-[14px] ${
                    isActive(item.name.toLowerCase())
                      ? "text-accent_blue"
                      : "text-subtitle_foreground"
                  }`}
                >
                  {item.name}
                </h2>
              </div>
            </button>
          ))}
        </>
      </section>
    </>
  );
}
