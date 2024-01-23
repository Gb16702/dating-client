"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../Icons/Loader";
import Button from "../UI/Button";
import Input from "../UI/Input";
import InputGroup from "../UI/InputGroup";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { forgotPasswordResetFormResolver } from "@/app/utils/validation/ForgotPasswordResetFormResolver";
import toast from "react-hot-toast";
import Toast from "../UI/Toast";
import { useRouter } from "next/navigation";
import Sparkles from "../Icons/Sparkles";
import { Eye, EyeOff } from "../Icons/EyeIcons";
import GeneratePassword from "@/app/utils/generatePassword";

type ForgotPasswordResetFormInputs = {
  password: string;
};

type FetcherType = {
  url: string;
  options: Record<string, any>;
};

async function fetcher({ url, options }: FetcherType) {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER}${url}`, { ...options });
}

export default function ForgotPasswordResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const { register, handleSubmit, reset, setValue } = useForm<ForgotPasswordResetFormInputs>({ resolver: zodResolver(forgotPasswordResetFormResolver) });

  const handleClick: () => void = useCallback(() => setVisible((v: boolean) => !v), []);
  const generatePassword: () => void = useCallback(() => setValue("password", GeneratePassword(12)), []);

  const onSubmit: SubmitHandler<ForgotPasswordResetFormInputs> = async ({ password }) => {
    setLoading(true);
    if(!password || !password.trim().length) {
      toast.custom(t => <Toast message="Le mot de passe ne peut pas être vide" type="Erreur" t={t} />);
      setLoading(false);
      return;
    }

    try {
      const response = await fetcher({
        url: "api/authentication/reset-forgotten-password",
        options: {
          method: "POST",
          headers: Object.assign({ "Content-Type": "application/json" }),
          body: JSON.stringify({ password, token }),
        },
      });

      const data = await response.json();
      setTimeout(() => setLoading(false), 1000);
      toast.custom(t => <Toast message={data.message} type={response.ok ? "Succès" : "Erreur"} t={t} />);

      if(response.ok) {
        router.push("/authentification/connexion");
      }
    } catch (e) {
      reset();
      console.log(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[75%] max-md:w-full">
          <InputGroup name="Adresse mail" width="100%">
            <Input
              type={visible ? "text" : "password"}
              ariaLabel="Mot de passe"
              placeholder="Mot de passe"
              id="password"
              additionalClasses="w-full"
              {...register("password")}
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center gap-x-2">
                <button aria-label="Générer un mot de passe" type="button" onClick={generatePassword}>
                  <Sparkles />
                </button>
                <button aria-label="Afficher / Masquer le mot de passe" type="button" onClick={handleClick}>
                  {visible ? <EyeOff /> : <Eye />}
                </button>
              </div>
          </InputGroup>
          <Button variant="default" customClasses="mt-4 rounded-[9px] font-semibold w-[50%] max-md:w-[100%]" width="50%">
            {loading ? <Loader /> : "Envoyer"}
          </Button>
        </div>
      </form>
    </>
  );
}
