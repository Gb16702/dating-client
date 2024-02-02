"use client";

import { useEffect, useState } from "react";
import Label from "../../UI/Label";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import InputGroup from "../../UI/InputGroup";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nameResolver } from "@/app/utils/validation/config/NameResolver";

type NameProps = {
  onNextStep: () => void;
  onNameChange: (data: NameFormInputs) => void;
  initialName: NameFormInputs;
};

export type NameFormInputs = {
  firstName: string;
  lastName: string;
};

export default function Name({ onNextStep, onNameChange, initialName }: NameProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormInputs>({
    resolver: zodResolver(nameResolver),
    defaultValues: {
      firstName: initialName.firstName,
      lastName: initialName.lastName,
    },
  });

  function getErrorMessage(): string | null {
    if (errors?.firstName) return errors?.firstName?.message ?? null;
    if (errors?.lastName) return errors?.lastName?.message ?? null;
    return null;
  }

  const onSubmit: SubmitHandler<NameFormInputs> = (data: NameFormInputs) => {
    setLoading(true);
    onNameChange(data);
    onNextStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-[400px] max-sm:w-full flex-1 pt-[20px] gap-y-3">
          <div>
            <Label name="Prénom" id="firstname" />
            <InputGroup outlineColor="outline-gray_border" additionalClasses="w-[75%] max-sm:w-full">
              <Input ariaLabel="Prénom" additionalClasses="w-full" type="text" placeholder="Ex: John" {...register("firstName")} />
            </InputGroup>
          </div>
          <div>
            <Label name="Nom" id="lastname" />
            <InputGroup outlineColor="outline-gray_border" additionalClasses="w-[75%] max-sm:w-full">
              <Input
                ariaLabel="Nom"
                type="text"
                placeholder="Ex: Doe"
                additionalClasses="text-black placeholder-gray_border w-full"
                {...register("lastName")}
              />
            </InputGroup>
          </div>
        </div>
        <p className="text-red-500 text-sm font-medium mt-3">{getErrorMessage()}</p>
        <Button
          variant={`${!!getErrorMessage() ? "error" : "default"}`}
          customClasses="mt-4 rounded-[9px] font-bold px-[25px] max-md:w-[100%]"
          disabled={!!getErrorMessage() || loading}>
          Continuer
        </Button>
      </form>
    </>
  );
}
