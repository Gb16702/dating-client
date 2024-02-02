import { useState, useEffect, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../UI/Button";
import Select from "../../UI/Select";
import type { CheckState, Item } from "../../UI/Select";

type CitiesProps = {
  onNextStep: () => void;
  onCityChange: (data: CheckState) => void;
  initialCity: CheckState;
  data: CitiesType;
};

export type CitiesType = {
  [x: string]: any;
};

export default function Cities({ onNextStep, initialCity, onCityChange, data }: CitiesProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<CheckState>();

  function getErrorMessage(): string | null {
    if (errors?.id) return errors?.id?.message ?? null;
    return null;
  }

  const onSubmit: SubmitHandler<CheckState> = data => {
    setLoading(true);
    onCityChange(data);
    onNextStep();
  };

  useEffect(() => {
    if (initialCity) {
      setValue("id", initialCity.id);
      setValue("item", initialCity.item);
    }
  }, [initialCity, setValue]);

  const setSelectedValue = useCallback((value: CheckState) => {
      setValue("id", value.id);
      setValue("item", value.item);
      if (value.id) {
        clearErrors('id');
      }
    }, [setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-[400px] max-sm:w-full flex-1 pt-[20px] gap-y-3">
          <Select
            placeholder="Choisir une ville"
            data={data}
            displayKey="name"
            setSelectedValue={setSelectedValue}
            initialValue={initialCity}
            {...register("id", { required: {value: true, message: "Veuillez choisir une ville"}})}
          />
        </div>
        {errors.id && <p className="text-red-500 text-sm font-medium mt-3">{getErrorMessage()}</p>}
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
