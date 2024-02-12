"use client";

import Label from "../../UI/Label";
import Button from "../../UI/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {birthDateResolver} from "@/app/utils/validation/config/BirthDateResolver";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";

type BirthDateProps = {
    onNextStep: () => void;
    initialBirthDate: BirthDateFormInputs;
    onBirthDateChange: (data: BirthDateFormInputs) => void;
};

export type BirthDateFormInputs = {
    day: string;
    month: string;
    year: string;
};

export default function BirthDate({onNextStep, onBirthDateChange, initialBirthDate}: BirthDateProps): JSX.Element {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {errors},
    } = useForm<BirthDateFormInputs>({
        resolver: zodResolver(birthDateResolver),
        defaultValues: {
            day: initialBirthDate.day,
            month: initialBirthDate.month,
            year: initialBirthDate.year,
        },
    });

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        const maxLength = name === 'year' ? 4 : 2;
        const trimmedValue = value.slice(0, maxLength);
        setValue(name, trimmedValue);
    };

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        const numericRegex = /[0-9]/;
        const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Shift"];

        if (!numericRegex.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault()
        }
    }

    useEffect(() => {
        reset({
            day: String(initialBirthDate.day),
            month: String(initialBirthDate.month),
            year: String(initialBirthDate.year),
        });
    }, [reset, initialBirthDate]);

    function getErrorMessage(): string | null {
        if (errors?.day) return errors?.day?.message ?? null;
        if (errors?.month) return errors?.month?.message ?? null;
        if (errors?.year) return errors?.year?.message ?? null;
        return null;
    }

    const onSubmit: SubmitHandler<BirthDateFormInputs> = (data: BirthDateFormInputs) => {
        setLoading(true);
        onBirthDateChange(data);
        onNextStep();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row w-[400px] ma  x-sm:w-full flex-1 pt-[20px] gap-x-3">
                    <div>
                        <Label name="Jour" id="day"/>
                        <div className="rounded-md outline outline-1 outline-gray_border h-[35px]">
                            <input
                                type="number"
                                aria-label="Jour"
                                maxLength={2}
                                minLength={0}
                                placeholder="JJ"
                                onKeyDown={handleKeyPress}
                                className="outline-none text-center text-base text-black placeholder-gray_border w-[60px] max-sm:w-[100%] h-full"
                                {...register("day", {onChange: handleInputChange})}
                            />
                        </div>
                    </div>
                    <div>
                        <Label name="Mois" id="month"/>
                        <div className="rounded-md outline outline-1 outline-gray_border h-[35px]">
                            <input
                                type="number"
                                aria-label="Mois"
                                placeholder="MM"
                                className="outline-none text-center text-base text-black placeholder-gray_border w-[60px] max-sm:w-[100%] h-full"
                                onKeyDown={handleKeyPress}
                                {...register("month", {onChange: handleInputChange})}
                            />
                        </div>
                    </div>
                    <div>
                        <Label name="Année" id="year"/>
                        <div className="rounded-md outline outline-1 outline-gray_border h-[35px]">
                            <input
                                type="number"
                                aria-label="Année"
                                placeholder="AAAA"
                                className="outline-none text-center text-base text-black placeholder-gray_border w-[80px] max-sm:w-[100%] h-full"
                                onKeyDown={handleKeyPress}
                                {...register("year", {onChange: handleInputChange})}
                            />
                        </div>
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
