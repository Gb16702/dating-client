import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-screen">
      <div className="w-[100%] max-w-[500px] max-lg:max-w-[100%] bg-white border-r border-whitish_border h-full flex justify-start items-center">
        <div className="min-h-[500px] w-full flex justify-center">
          <section>{children}</section>
        </div>
      </div>
    </main>
  );
}
