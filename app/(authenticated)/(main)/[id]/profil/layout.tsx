import ProfileSidebar from "@/app/components/App/ProfileSidebar";
import {ReactNode} from "react";

export default function ProfileLayout({children}: { children: ReactNode }) {
    return (
        <>
            <div className="flex flex-grow max-sm:flex-grow max-sm:w-full">
                <ProfileSidebar/>
                <div className="flex flex-col flex-grow  max-sm:flex-grow-0 ">{children}</div>
            </div>
        </>
    );
}
