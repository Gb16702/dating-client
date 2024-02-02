"use client";

import { useState, useRef, useEffect, RefObject } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../UI/Button";
import InputGroup from "../../UI/InputGroup";

type PreferredGenderProps = {
  onNextStep: () => void;
  onGenderChange: (data: PreferredGenderFormInputs) => void;
  initialPreferredGender: PreferredGenderFormInputs;
};

export type PreferredGenderFormInputs = {
  gender: number;
};

export default function PreferredGender({ onNextStep, initialPreferredGender, onGenderChange }: PreferredGenderProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [genderChecked, setGenderChecked] = useState<number | null>(null);

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

  function handleGenderChecked(gender: number) {
    setGenderChecked(gender);
    setValue("gender", gender);
  }

  useEffect(() => {
    setGenderChecked(initialPreferredGender.gender);
    initialPreferredGender.gender && setValue("gender", initialPreferredGender.gender);
  }, [initialPreferredGender]);

  const onSubmit: SubmitHandler<PreferredGenderFormInputs> = (data: PreferredGenderFormInputs) => {
    setLoading(true);
    onGenderChange(data);
    onNextStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-[400px] max-sm:w-full flex-1 pt-[20px] gap-y-3">
          <InputGroup
            additionalClasses="w-[75%] max-sm:w-full"
            outlineColor={genderChecked === 1 ? "outline-black" : "outline-gray_border"}
            onClick={() => menRef?.current?.click()}>
            <div className="flex justify-between w-full">
              <span className="ml-2 font-semibold">Homme</span>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="invisible"
                  value="1"
                  onClick={() => handleGenderChecked(1)}
                  {...register("gender", { required: { value: true, message: "Veuillez choisir un genre" } })}
                  ref={menRef}
                />
                <div className="rounded-full w-[14px] h-[14px] outline outline-1 outline-black flex items-center justify-center relative">
                  {genderChecked === 1 && <div className="rounded-full w-[10px] h-[10px] bg-black"></div>}
                </div>
              </div>
            </div>
          </InputGroup>
          <InputGroup
            additionalClasses="w-[75%] max-sm:w-full"
            outlineColor={genderChecked === 2 ? "outline-black" : "outline-gray_border"}
            onClick={() => womenRef?.current?.click()}>
            <div className="flex justify-between w-full">
              <span className="ml-2 font-semibold">Femme</span>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="invisible"
                  value="2"
                  {...register("gender", { required: { value: true, message: "Veuillez choisir un genre" } })}
                  ref={womenRef}
                  onClick={() => handleGenderChecked(2)}
                />
                <div className="rounded-full w-[14px] h-[14px] outline outline-1 outline-black flex items-center justify-center relative">
                  {genderChecked === 2 && <div className="rounded-full w-[10px] h-[10px] bg-black"></div>}
                </div>
              </div>
            </div>
          </InputGroup>
          <InputGroup
            additionalClasses="w-[75%] max-sm:w-full"
            outlineColor={genderChecked === 3 ? "outline-black" : "outline-gray_border"}
            onClick={() => everyoneRef?.current?.click()}>
            <div className="flex justify-between w-full">
              <span className="ml-2 font-semibold">Tout le monde</span>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="invisible"
                  value="3"
                  onClick={() => handleGenderChecked(3)}
                  {...register("gender", { required: { value: true, message: "Veuillez choisir une préférence de genre" } })}
                  ref={everyoneRef}
                />
                <div className="rounded-full w-[14px] h-[14px] outline outline-1 outline-black flex items-center justify-center relative">
                  {genderChecked === 3 && <div className="rounded-full w-[10px] h-[10px] bg-black"></div>}
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
