"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../Button";
import Loader from "../Icons/Loader";
import Input from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchemaObject } from "@/app/utils/resolver";

type RegisterFormInputs = {
  email: string;
  password: string;
};

export default function RegisterForm(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(loginSchemaObject),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = (
    data: RegisterFormInputs
  ) => {
    console.log(data);
    setLoading(true);
    //ici je mets le bouton à charger
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-[35px]">
      <div className="flex flex-col gap-y-4">
        <div>
          <Input
            label="Adresse mail"
            type="email"
            placeholder="toi@exemple.com"
            name="email"
            ariaLabel="Adresse email"
            width="340px"
          />
        </div>
        <div>
          <Input
            label="Mot de passe"
            type="password"
            placeholder="•••••••"
            name="password"
            ariaLabel="Mot de passe"
            width="340px"
          />
        </div>
      </div>
      <div className="mt-[20px]">
        <Button variant="default" width="340px" disabled={loading}>
          {loading ? <Loader /> : "Inscription"}
        </Button>
      </div>
    </form>
  );
}
