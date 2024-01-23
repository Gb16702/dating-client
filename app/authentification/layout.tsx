import { ReactNode } from "react";
import { headers } from "next/headers";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export default function AuthLayout({ children }: { children: ReactNode }) {

  return (
    <main className="h-screen">
      <div className={`w-[100%] max-w-[500px] bg-white max-lg:max-w-[100%] border-r border-whitish_border h-full flex justify-start items-center`}>
        <div className="min-h-[500px] w-full flex justify-center">
          <section>{children}</section>
        </div>
      </div>
    </main>
  );
}
