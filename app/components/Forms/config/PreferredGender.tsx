"use client";

import { useState, useRef, useEffect, RefObject } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../UI/Button";
import InputGroup from "../../UI/InputGroup";

type PreferredGenderProps = {
  onNextStep: () => void;
  onGenderChange: (data: PreferredGenderFormInputs) => void;
  initialGender: PreferredGenderFormInputs;
};

export type PreferredGenderFormInputs = {
  gender: string;
};

export default function PreferredGender({ onNextStep, initialGender, onGenderChange }: PreferredGenderProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [genderChecked, setGenderChecked] = useState("");

  const menRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const womenRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const everyoneRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PreferredGenderFormInputs>();

  function getErrorMessage(): string | null {
    if (errors?.gender) return errors?.gender?.message ?? null;
    return null;
  }

  function handleGenderChecked(gender: "homme" | "femme" | "tout-le-monde") {
    setGenderChecked(gender);
    setValue("gender", gender)
  }

  useEffect(() => {
    setGenderChecked(initialGender.gender)
    initialGender.gender && setValue("gender", initialGender.gender);
  }, [initialGender])

  const onSubmit: SubmitHandler<PreferredGenderFormInputs> = (data: PreferredGenderFormInputs) => {
    setLoading(true);
    onGenderChange(data);
    onNextStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-[400px] flex-1 pt-[20px] gap-y-3">
          <InputGroup width="75%" outlineColor={ genderChecked === "homme" ? "outline-black" : "outline-gray_border" } onClick={() => menRef?.current?.click()}>
            <div className="flex justify-between w-full">
              <span className="ml-2 font-semibold">Homme</span>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="invisible"
                  value="homme"
                  onClick={() => handleGenderChecked("homme")}
                  {...register("gender", { required: { value: true, message: "Veuillez choisir un genre" }})}
                  ref={menRef}
                />
                <div className="rounded-full w-[14px] h-[14px] outline outline-1 outline-black flex items-center justify-center relative">
                  {genderChecked === "homme" && <div className="rounded-full w-[10px] h-[10px] bg-black"></div>}
                </div>
              </div>
            </div>
          </InputGroup>
          <InputGroup width="75%" outlineColor={ genderChecked === "femme" ? "outline-black" : "outline-gray_border" } onClick={() => womenRef?.current?.click()}>
            <div className="flex justify-between w-full">
              <span className="ml-2 font-semibold">Femme</span>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="invisible"
                  value="femme"
                  {...register("gender", { required: { value: true, message: "Veuillez choisir un genre" }})}
                  ref={womenRef}
                  onClick={() => handleGenderChecked("femme")}
                />
                <div className="rounded-full w-[14px] h-[14px] outline outline-1 outline-black flex items-center justify-center relative">
                  {genderChecked === "femme" && <div className="rounded-full w-[10px] h-[10px] bg-black"></div>}
                </div>
              </div>
            </div>
          </InputGroup>
          <InputGroup width="75%" outlineColor={ genderChecked === "tout-le-monde" ? "outline-black" : "outline-gray_border" } onClick={() => everyoneRef?.current?.click()}>
            <div className="flex justify-between w-full">
              <span className="ml-2 font-semibold">Tout le monde</span>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="invisible"
                  value="tout-le-monde"
                  onClick={() => handleGenderChecked("tout-le-monde")}
                  {...register("gender", { required: { value: true, message: "Veuillez choisir une préférence de genre" }})}
                  ref={everyoneRef}
                />
                <div className="rounded-full w-[14px] h-[14px] outline outline-1 outline-black flex items-center justify-center relative">
                  {genderChecked === "tout-le-monde" && <div className="rounded-full w-[10px] h-[10px] bg-black"></div>}
                </div>
              </div>
            </div>
          </InputGroup>
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
