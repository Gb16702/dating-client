import Aside from "@/app/components/admin/Aside";
import NavBar from "@/app/components/admin/NavBar";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Admin",
    description: "Admin",
};

export default function AdminLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="flex max-h-screen overflow-hidden fixed w-full">
            <Aside/>
            <div className="flex flex-col flex-1 overflow-y-auto max-h-screen">
                <header className="w-full h-[80px] border-b border-whitish_border bg-white px-8">
                    <div className="flex items-center justify-end h-full">
                        <NavBar/>
                    </div>
                </header>
                <div className="flex-1">
                    <div className=" mx-auto px-4 ">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}