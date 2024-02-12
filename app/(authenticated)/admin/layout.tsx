import Aside from "@/app/components/admin/Aside";
import NavBar from "@/app/components/admin/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-h-screen overflow-hidden fixed w-full">
      <Aside />
      <div className="flex flex-col flex-1 overflow-y-auto max-h-screen">
        <NavBar />
        <div className="flex-1">
          <div className=" mx-auto px-4 ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
