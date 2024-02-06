"use client";

import { useEffect, useState } from "react";
import ConfigForm from "./Forms/ConfigForm";
import Arrow from "./Icons/Arrow";
import { CitiesType } from "./Forms/config/Cities";
import { InterestType } from "./Forms/config/AdditionalInformations";

export type Step = {
  current: number;
  total: number;
};

type ConfigProps = {
  cities: CitiesType;
  interests: InterestType[];
  sessionId: string | undefined;
};

type Text = {
  title: string;
  message: string;
};

export default function Config({ cities, interests, sessionId }: ConfigProps): JSX.Element {
  const [text, setText] = useState<Text>({
    title: "",
    message: "",
  });
  const [step, setStep] = useState<Step>({
    current: 1,
    total: 7,
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

    if (step.current === 5) {
      setText((prev: Text) => ({
        ...prev,
        title: "Ma ville",
        message: "Indiquez votre ville de résidence",
      }));
    }

    if (step.current === 6) {
      setText((prev: Text) => ({
        ...prev,
        title: "Informations supplémentaires",
        message: "Sélectionne tes photos, tes centres d'intérêts et écris ta bio",
      }));
    }

    if (step.current === 7) {
      setText((prev: Text) => ({
        ...prev,
        title: "Mes goûts musicaux",
        message: "Sélectionne tes sons préférés venant de Spotify",
      }));
    }
  }, [step]);

  useEffect(() => {
    console.log(step);
  }, []);

  function handleStepChanges(type: "next" | "previous") {
    setStep((prev: Step) => ({
      ...prev,
      current: type === "next" ? prev.current + 1 : prev.current - 1,
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
      <ConfigForm
        data={step.current === 5 ? cities : interests}
        step={step}
        onNextStep={() => handleStepChanges("next")}
        onPreviousStep={() => handleStepChanges("previous")}
        sessionId={sessionId}
      />
    </>
  );
}
