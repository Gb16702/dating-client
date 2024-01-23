"use client";

import { useEffect, useState } from "react";
import ConfigForm from "./Forms/ConfigForm";
import Arrow from "./Icons/Arrow";

export type Step = {
  current: number;
  progress: number;
  total: number;
};

type Text = {
  title: string;
  message: string;
};

export default function Config(): JSX.Element {
  const [text, setText] = useState<Text>({
    title: "",
    message: "",
  });
  const [step, setStep] = useState<Step>({
    current: 4,
    progress: 1,
    total: 4,
  });

  useEffect(() => {
    if (step.current === 1) {
      setText((prev: Text) => ({
        ...prev,
        title: "Ma date de naissance",
        message: "Votre âge sera visible par tout le monde",
      }));
    }

    if (step.current === 2) {
      setText((prev: Text) => ({
        ...prev,
        title: "Mon prénom et mon nom",
        message: "Ils seront visible par tout le monde",
      }));
    }

    if (step.current === 3) {
      setText((prev: Text) => ({
        ...prev,
        title: "Mon genre",
        message: "Définissez votre genre",
      }));
    }

    if (step.current === 4) {
      setText((prev: Text) => ({
        ...prev,
        title: "Qui voulez-vous rencontrer ?",
        message: "Vous pourrez modifier ce paramètre plus tard",
      }));
    }
  }, [step]);

  function handleStepChanges(type: "next" | "previous") {
    setStep((prev: Step) => ({
      ...prev,
      current: type === "next" ? prev.current + 1 : prev.current - 1,
      progress: prev.progress + 1,
    }));
  }

  return (
    <>
      {step.current > 1 && (
        <button
          onClick={() => {
            setStep((prev: Step) => ({ ...prev, current: prev.current - 1 }));
          }}>
          <Arrow classes="rotate-180 w-[15px] h-[15px] fill-black relative top-[2px] mr-[8px]" />
        </button>
      )}
      <small className="font-semibold">
        Étape {step.current} sur {step.total}
      </small>
      <h2 className={`font-bold text-[21px]`}>{text.title}</h2>
      <p className="text-subtitle_foreground text-[13px]">{text.message}</p>
      <ConfigForm step={step} onNextStep={() => handleStepChanges("next")} onPreviousStep={() => handleStepChanges("previous")} />
    </>
  );
}
