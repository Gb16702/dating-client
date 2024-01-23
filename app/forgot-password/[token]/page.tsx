import { redirect, RedirectType } from "next/navigation";
import ForgotPasswordResetPasswordForm from "@/app/components/Forms/ForgotPasswordResetPasswordForm";

export default async function Token({ params }: { params: { token: string } }): Promise<JSX.Element> {
  const { token } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/authentication/verify-token`, {
    method: "POST",
    headers: Object.assign({ "Content-Type": "application/json" }),
    body: JSON.stringify({ token }),
    cache: "no-store",
  });

  if (!response.ok) redirect("/forgot-password", RedirectType.replace);

  await response.json();

  return (
    <section className="w-full h-screen flex justify-center items-center max-sm:bg-white">
      <div className="w-[500px] min-h-fit py-8 bg-white rounded-[8px] max-md:rounded-none border border-whitish_border max-sm:border-none p-5">
        <h1 className="text-[21px] font-bold">Nouveau mot de passe</h1>
        <h1 className="text-[12px] font-medium mt-1 text-gray_border">Entre ton nouveau mot de passe ci-dessous</h1>
        <div className="mt-9">
          <ForgotPasswordResetPasswordForm token={token} />
        </div>
      </div>
    </section>
  );
}
