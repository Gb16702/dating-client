import ProfileSidebar from "@/app/components/App/ProfileSidebar";
import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-grow">
        <ProfileSidebar />
        <div className="flex flex-col flex-grow">{children}</div>
      </div>
    </>
  );
}
