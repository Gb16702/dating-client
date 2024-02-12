"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "../../Icons/Sidebar/App/AppIcons";

type NavigationItems = {
  name: string;
  icon: JSX.Element;
  href: string;
};

type NavigationProps = {
  isAdmin: boolean;
  id: string | undefined;
};

export default function Navigation({ isAdmin, id }: NavigationProps): JSX.Element {
  const pathname = usePathname();

  function getIconClass(path: string, isActive: boolean) {
    return `w-4 h-4 fill-none w-6 h-6 ${isActive ? "stroke-accent" : "stroke-black"}`;
  }

  const navigationItems: NavigationItems[] = [
    {
      name: "Découvrir",
      icon: <Icons.Home classes={getIconClass("/", pathname === "/")} />,
      href: "/",
    },
    {
      name: "Conversations",
      icon: <Icons.Chat classes={getIconClass(`/${id}/conversations`, pathname.startsWith(`/${id}/conversations`))} />,
      href: `/${id}/conversations`,
    },
    {
      name: "Profil",
      icon: <Icons.Settings classes={getIconClass(`/${id}/profil`, pathname.startsWith(`/${id}/profil`))} />,
      href: `/${id}/profil`,
    },
    {
      name: "Notre Application",
      icon: <Icons.Phone classes={`w-4 h-4 fill-none w-6 h-6 ${pathname === "/d" ? "stroke-accent" : "stroke-black"}`} />,
      href: "/eaza",
    },
  ].filter(Boolean);

  if (isAdmin) {
    navigationItems.push({
      name: "Administration",
      icon: <Icons.Administration classes={`w-4 h-4 fill-none w-6 h-6 ${pathname === "/admin" ? "stroke-accent" : "stroke-black"}`} />,
      href: "/admin",
    });
  }

  function activeLink(href: string) {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  }

  return (
    <>
      <header className="w-full h-full">
        <nav className="flex flex-col items-center justify-center w-full h-full gap-y-5 max-md:gap-2">
          {navigationItems.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className={`flex justify-start w-full gap-x-5 h-[42px] items-center px-2 max-md:p-0 rounded-[10px] ${
                activeLink(item.href) && "bg-accent_blue/[.10] max-md:bg-transparent text-accent_blue"
              }`}>
              <span className="flex flex-col items-center justify-center gap-y-1 max-md:hidden">{item.icon}</span>
              <span className="text-[15px] font-medium  max-md:text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
