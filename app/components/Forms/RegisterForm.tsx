"use client";

import GeneratePassword from "@/app/utils/generatePassword";
import { useCallback, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "../Icons/EyeIcons";
import Loader from "../Icons/Loader";
import Sparkles from "../Icons/Sparkles";
import Button from "../UI/Button";
import Input from "../UI/Input";
import InputGroup from "../UI/InputGroup";
import Label from "../UI/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchemaObject } from "@/app/utils/validation/AuthResolver";

type RegisterFormInputs = {
  email: string;
  password: string;
};

export default function RegisterForm(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(loginSchemaObject)
  });

  const handleClick: () => void = useCallback(
    () => setVisible((v: boolean) => !v),
    []
  );
  const generatePassword: () => void = useCallback(
    () => setValue("password", GeneratePassword(12)),
    []
  );

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (
    data: RegisterFormInputs
  ) => {
    console.log(data);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/authentication/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      })

      const result = await response.json();
      console.log(result);
    }
    catch(err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-[35px]">
      <div className="flex flex-col gap-y-4">
        <div>
          <Label name="Adresse mail" id="email" />
          <InputGroup name="Adresse mail">
            <Input
              type="email"
              ariaLabel="Adresse mail"
              placeholder="toi@exemple.com"
              id="email"
              {...register("email")}
            />
          </InputGroup>
        </div>
        <div>
          <Label name="Mot de passe" id="password" />
          <InputGroup name="Mot de passe">
            <Input
              type={visible ? "text" : "password"}
              ariaLabel="Mot de passe"
              placeholder="•••••••"
              id="password"
              {...register("password")}
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center gap-x-2">
              <button
                aria-label="Générer un mot de passe"
                type="button"
                onClick={generatePassword}
              >
                <Sparkles />
              </button>
              <button
                aria-label="Afficher / Masquer le mot de passe"
                type="button"
                onClick={handleClick}
              >
                {visible ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </InputGroup>
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
