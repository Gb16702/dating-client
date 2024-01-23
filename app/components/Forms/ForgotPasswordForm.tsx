"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { forgotPasswordResolver } from "@/app/utils/validation/ForgotPasswordResolver";
import Button from "../UI/Button";
import Loader from "../Icons/Loader";
import Input from "../UI/Input";
import InputGroup from "../UI/InputGroup";
import toast from "react-hot-toast";
import Toast from "../UI/Toast";

export type ForgotPasswordFormInputs = {
  email: string;
};

type FetcherType = {
  url: string;
  options: Record<string, any>;
};

async function fetcher({ url, options }: FetcherType) {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER}${url}`, { ...options });
}

export default function ForgotPasswordForm(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<ForgotPasswordFormInputs>({ resolver: zodResolver(forgotPasswordResolver) });

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async ({ email }: ForgotPasswordFormInputs) => {
    setLoading(true);
    try {
      const response = await fetcher({
        url: `api/authentication/forgot-password`,
        options: {
          method: "POST",
          headers: Object.assign({ "Content-Type": "application/json" }),
          body: JSON.stringify({ email }),
        },
      });

      const data = await response.json();
      const message = data.message ?? data.errors[0].message ?? "Une erreur est survenue";

      toast.custom(t => <Toast message={message} type={response.ok ? "Succès" : "Erreur"} t={t} />);
    } catch (e) {
      reset();
      console.log(e);
    } finally {
      reset();
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[75%] max-md:w-full">
          <InputGroup name="Adresse mail" width="100%">
            <Input type="email" ariaLabel="Adresse mail" placeholder="Entre ton adresse mail" id="email" {...register("email")} />
          </InputGroup>
          <Button variant="default" customClasses="mt-4 rounded-[9px] font-semibold w-[50%] max-md:w-[100%]" disabled={loading}>
            {loading ? <Loader /> : "Envoyer"}
          </Button>
        </div>
      </form>
    </>
  );
}
