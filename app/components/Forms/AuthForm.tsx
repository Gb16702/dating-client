"use client";

import GeneratePassword from "@/app/utils/generatePassword";
import {loginSchemaObject} from "@/app/utils/validation/AuthResolver";
import {zodResolver} from "@hookform/resolvers/zod";
import {setCookie} from "cookies-next";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {Eye, EyeOff} from "../Icons/EyeIcons";
import Loader from "../Icons/Loader";
import Sparkles from "../Icons/Sparkles";
import Button from "../UI/Button";
import Input from "../UI/Input";
import InputGroup from "../UI/InputGroup";
import Label from "../UI/Label";
import Polygon from "../UI/Modal/Polygon";
import Toast from "../UI/Toast";

type AuthFormInputs = {
    email: string;
    password: string;
};

type AuthFormProps = {
    type: "login" | "register";
};

export default function AuthForm({type}: AuthFormProps): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [complete, setComplete] = useState<boolean>(false);
    const [id, setId] = useState<string>("");


    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<AuthFormInputs>({
        resolver: zodResolver(loginSchemaObject),
    });

    const handleClick: () => void = useCallback(
        () => setVisible((v: boolean) => !v),
        []
    );
    const generatePassword: () => void = useCallback(
        () => setValue("password", GeneratePassword(12)),
        []
    );

    const onSubmit: SubmitHandler<AuthFormInputs> = async (
        data: AuthFormInputs
    ) => {
        console.log(data);
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER}api/authentication/${
                    type === "login" ? "login" : "register"
                }`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                    }),
                }
            );

            const {token, id: userId, message} = await response.json();

            if (!response.ok) {
                toast.custom((t) => (
                    <Toast
                        message={message}
                        type={response.ok ? "Succès" : "Erreur"}
                        t={t}
                    />
                ));
                return;
            }

            setCookie("token", token, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
                secure: false,
                httpOnly: false,
                sameSite: "lax",
            });

            setCookie("uid", userId, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
                secure: false,
                httpOnly: false,
                sameSite: "lax",
            });

            setId(userId);
            setComplete(true);
            router.push("/")
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    function onCompleteRedirect() {
        router.refresh();
    }

    return (
        <>
            {complete && type === "register" && (
                <Polygon additionalClasses="p-4 max-sm:w-[95%] max-sm:h-[220px] flex flex-col">
                    <h1 className="font-bold text-[21px]">Inscription réussie ! </h1>
                    <h3 className="text-long_foreground text-[13px] mt-3 max-sm:text-[14px]">
                        Félicitations ! Avant de commencer, donnons vie à votre profil pour
                        qu'il reflète au mieux votre personnalité et vos goûts musicaux.
                    </h3>
                    <div className="flex-grow"></div>
                    <div className="mt-[35px]">
                        <Button
                            variant="default"
                            customClasses="px-4 font-bold tracking-wide rounded-[8px] max-sm:w-full"
                            onClick={onCompleteRedirect}
                        >
                            <Link href={`/${id}/profil/configuration`}>
                                Configurer le profil
                            </Link>
                        </Button>
                    </div>
                </Polygon>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-[35px]">
                <div className="flex flex-col gap-y-4">
                    <div>
                        <Label name="Adresse mail" id="email"/>
                        <InputGroup name="Adresse mail">
                            <Input
                                type="email"
                                additionalClasses="w-full"
                                ariaLabel="Adresse mail"
                                placeholder="toi@exemple.com"
                                id="email"
                                {...register("email")}
                            />
                        </InputGroup>
                    </div>
                    <div>
                        <div className="w-full flex justify-between">
                            <Label name="Mot de passe" id="password"/>
                            {type === "login" && (
                                <Link
                                    className="text-[12px] font-medium text-subtitle_foreground"
                                    href="/forgot-password"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            )}
                        </div>
                        <InputGroup name="Mot de passe">
                            <Input
                                type={visible ? "text" : "password"}
                                additionalClasses="w-full"
                                ariaLabel="Mot de passe"
                                placeholder="•••••••"
                                id="password"
                                {...register("password")}
                            />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center gap-x-2">
                                {type === "register" && (
                                    <button
                                        aria-label="Générer un mot de passe"
                                        type="button"
                                        onClick={generatePassword}
                                    >
                                        <Sparkles/>
                                    </button>
                                )}
                                <button
                                    aria-label="Afficher / Masquer le mot de passe"
                                    type="button"
                                    onClick={handleClick}
                                >
                                    {visible ? <EyeOff/> : <Eye/>}
                                </button>
                            </div>
                        </InputGroup>
                    </div>
                </div>
                <div className="mt-[20px]">
                    <Button
                        variant="default"
                        customClasses="rounded-[9px] w-[340px] font-semibold"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader/>
                        ) : type === "login" ? (
                            "Se connecter"
                        ) : (
                            "S'inscrire"
                        )}
                    </Button>
                </div>
            </form>
        </>
    );
}
