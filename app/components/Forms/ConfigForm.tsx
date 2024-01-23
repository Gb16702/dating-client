"use client";

import { useState } from "react";
import type { Step } from "../Config";

import BirthDate from "./config/BirthDate";
import Name from "./config/Name";
import Gender from "./config/Gender";
import type { BirthDateFormInputs } from "./config/BirthDate";
import type { NameFormInputs } from "./config/Name";
import type { GenderFormInputs } from "./config/Gender";
import PreferredGender from "./config/PreferredGender";

type ConfigFormProps = {
  step: Step;
  onNextStep: () => void;
  onPreviousStep: () => void;
}

export default function ConfigForm({ step, onNextStep }: ConfigFormProps): JSX.Element {

  const [birthDate, setBirthDate] = useState<BirthDateFormInputs>({} as BirthDateFormInputs)
  const [name, setName] = useState<NameFormInputs>({} as NameFormInputs)
  const [gender, setGender] = useState<GenderFormInputs>({} as GenderFormInputs)

  function handleBirthDateChange(data: BirthDateFormInputs) {
    setBirthDate(data);
  }

  function handleNameChange(data: NameFormInputs) {
    setName(data);
  }

  function handleGenderChange(data: GenderFormInputs) {
    setGender(data);
  }

  if(step.current === 1) {
     return <BirthDate onNextStep={onNextStep} initialBirthDate={birthDate} onBirthDateChange={handleBirthDateChange} />
  }

  else if(step.current === 2) {
     return <Name onNextStep={onNextStep} initialName={name} onNameChange={handleNameChange} />
  }

  else if (step.current === 3) {
    return <Gender onNextStep={onNextStep} initialGender={gender} onGenderChange={handleGenderChange} />
  }

  else if (step.current === 4) {
    return <PreferredGender onNextStep={onNextStep} initialGender={gender} onGenderChange={handleGenderChange} />
  }


  return (
      <>
    </>
  )
}
