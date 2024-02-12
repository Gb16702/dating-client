import Link from "next/link";
import React, { memo } from "react";
import type { PropsWithChildren } from "react";

interface NavItemProps extends PropsWithChildren {
  href: string;
  text: string;
  icon?: JSX.Element;
}

const navItems = [
  { href: "/dashboard", text: "Dashboard" },
  { href: "/admin/users", text: "Users" },
  { href: "/admin/interests", text: "Hobbies" },
  { href: "/admin/reports", text: "Reports" },
  // { href: "/admin/support", text: "Support" }
];

const NavItem = ({ href, icon, text }: NavItemProps) => (
  <li className="pl-4 py-2 list-none flex space-x-3 items-center">
    <Link href={href} className="flex items-center text-gray-900 hover:text-gray-600 font-medium mr-6">
      {icon}
      <span className="text-lg">{text}</span>
    </Link>
  </li>
);

const Aside = memo(() => {
  return (
    <aside className="hidden lg:block w-1/5 border-r border-whitish_border bg-white h-screen overflow-hidden">
      <header className="p-4">
        <div className="flex items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Dating Admin</h2>
        </div>
      </header>
      <nav className="flex-grow mt-5 h-4/5">
        <ul className="space-y-4 flex flex-col justify-between">
          {navItems.map(item => (
            <NavItem key={item.text} href={item.href} text={item.text} />
          ))}
        </ul>
      </nav>
      <div className="pl-4">
        <NavItem href="/" text="Return to website" />
      </div>
    </aside>
  );
});

Aside.displayName = 'Aside';

export default Aside;
