"use client";

import { useEffect, useState } from "react";
import type { Step } from "../Config";

import BirthDate from "./config/BirthDate";
import Name from "./config/Name";
import Gender from "./config/Gender";
import type { BirthDateFormInputs } from "./config/BirthDate";
import type { NameFormInputs } from "./config/Name";
import type { GenderFormInputs } from "./config/Gender";
import type { PreferredGenderFormInputs } from "./config/PreferredGender";
import PreferredGender from "./config/PreferredGender";
import type { CitiesType } from "./config/Cities";
import Cities from "./config/Cities";
import { CheckState } from "../UI/Select";
import AdditionalInformations, { InterestType } from "./config/AdditionalInformations";
import Tracks from "./config/Tracks";
import toast from "react-hot-toast";
import Toast from "../UI/Toast";

type ConfigFormProps = {
  step: Step;
  onNextStep: () => void;
  onPreviousStep: () => void;
  data: CitiesType | any;
  sessionId: string | undefined;
};

export default function ConfigForm({ step, onNextStep, data, sessionId }: ConfigFormProps): JSX.Element {
  const [birthDate, setBirthDate] = useState<BirthDateFormInputs>({} as BirthDateFormInputs);
  const [name, setName] = useState<NameFormInputs>({} as NameFormInputs);
  const [gender, setGender] = useState<GenderFormInputs>({} as GenderFormInputs);
  const [preferredGender, setPreferredGender] = useState({} as PreferredGenderFormInputs);
  const [city, setCity] = useState<CheckState>({} as CheckState);
  const [additionalInformations, setAdditionalInformations] = useState<any>({
    bio: "",
    images: new Array(4).fill(""),
    interests: [],
  });
  const [tracks, setTracks] = useState<any>([]);
  const [achieved, setAchieved] = useState<boolean>(false);

  function handleBirthDateChange(data: BirthDateFormInputs) {
    setBirthDate(data);
  }

  function handleNameChange(data: NameFormInputs) {
    setName(data);
  }

  function handleGenderChange(data: GenderFormInputs) {
    setGender(data);
  }

  function handlePreferredGenderChange(data: PreferredGenderFormInputs) {
    setPreferredGender(data);
  }

  function handleCityChange(data: CheckState) {
    setCity(data);
  }

  function handleAdditionalInformationsChange(data: any) {
    setAdditionalInformations(data);
  }

  function handleTrackChange(data: any) {
    setTracks(data);
  }

  async function sendData() {
    const formData = new FormData();
    formData.append("birth_date", JSON.stringify(birthDate));
    formData.append("first_name", JSON.stringify(name.firstName));
    formData.append("last_name", JSON.stringify(name.lastName));
    formData.append("gender", JSON.stringify(gender));
    formData.append("preferred_gender", JSON.stringify(preferredGender));
    formData.append("city", JSON.stringify(city));
    formData.append(
      "additional_informations",
      JSON.stringify({
        bio: additionalInformations.bio,
        interests: additionalInformations.interests,
      })
    );
    if (tracks) {
      formData.append(
        "tracks",
        JSON.stringify(
          tracks.map((track: any) => {
            return {
              id: track.id,
            };
          })
        )
      );
    }

    if (additionalInformations.images) {
      additionalInformations.images.map((image: any, i: number) => {
        if (image instanceof File) {
          formData.append(`image`, image);
        }
      });
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/users/profile/setup`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
        body: formData,
      });

      const { message }: { message: string } = await response.json();
      setAchieved(false);
      toast.custom((t) => <Toast type={response.ok ? "Succès" : "Erreur"} message={message} t={t} />);
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
      setAchieved(false);
      toast.custom((t) => <Toast type="Erreur" message="Erreur lors de l'envoi des données" t={t} />);
    }
  }

  useEffect(() => {
    if (achieved) {
      sendData();
    }
  }, [sendData]);

  if (step.current === 1) {
    return <BirthDate onNextStep={onNextStep} initialBirthDate={birthDate} onBirthDateChange={handleBirthDateChange} />;
  } else if (step.current === 2) {
    return <Name onNextStep={onNextStep} initialName={name} onNameChange={handleNameChange} />;
  } else if (step.current === 3) {
    return <Gender onNextStep={onNextStep} initialGender={gender} onGenderChange={handleGenderChange} />;
  } else if (step.current === 4) {
    return <PreferredGender onNextStep={onNextStep} initialPreferredGender={preferredGender} onGenderChange={handlePreferredGenderChange} />;
  } else if (step.current === 5) {
    return <Cities data={data} onNextStep={onNextStep} initialCity={city} onCityChange={handleCityChange} />;
  } else if (step.current === 6) {
    return (
      <AdditionalInformations
        data={data}
        initialAdditionalInformations={additionalInformations}
        onNextStep={onNextStep}
        onAdditionalInformationChange={handleAdditionalInformationsChange}
      />
    );
  } else if (step.current === 7) {
    return <Tracks sessionId={sessionId} setAchieved={setAchieved} initialTracks={tracks} onTrackChange={handleTrackChange} />;
  }

  return <></>;
}
