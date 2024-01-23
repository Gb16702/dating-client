import ForgotPasswordForm from "../components/Forms/ForgotPasswordForm";

export default function ForgotPassword(): JSX.Element {
  return (
    <>
      <section className="w-full h-screen flex justify-center items-center max-sm:bg-white">
        <div className="w-[500px] min-h-fit py-8 bg-white rounded-[8px] max-md:rounded-none border border-whitish_border max-sm:border-none p-5">
          <h1 className="text-[21px] font-bold">Mot de passe oublié ?</h1>
          <h1 className="text-[12px] font-medium text-gray_border">Entrez votre adresse mail pour le réinitialiser</h1>
          <div className="mt-9">
            <ForgotPasswordForm />
          </div>
        </div>
      </section>
    </>
  );
}
