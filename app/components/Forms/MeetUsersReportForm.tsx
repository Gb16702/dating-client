"use client";

import {Controller, SubmitHandler, useForm} from "react-hook-form";
import Button from "../UI/Button";
import Input from "../UI/Input";
import InputGroup from "../UI/InputGroup";
import Label from "../UI/Label";
import {zodResolver} from "@hookform/resolvers/zod";
import {reportResolver} from "@/app/utils/validation/ReportResolver";
import {getCookie} from "cookies-next";
import toast from "react-hot-toast";
import Toast from "../UI/Toast";

type MeetUsersReportForm = {
    reason: string;
    details: string;
    reported_user_id: string;
};

type MeetUsersReportFormProps = {
    uid: string;
};

export default function MeetUsersReportForm({uid}: MeetUsersReportFormProps): JSX.Element {
    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<MeetUsersReportForm>({
        resolver: zodResolver(reportResolver),
        defaultValues: {
            reported_user_id: uid,
        },
    });

    const onSubmit: SubmitHandler<MeetUsersReportForm> = async ({
                                                                    reported_user_id,
                                                                    reason,
                                                                    details
                                                                }: MeetUsersReportForm) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/reports/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getCookie("token")}`,
                },
                body: JSON.stringify({
                    reported_user_id,
                    report_reason: reason,
                    report_description: details,
                }),
            });
            const {message} = await response.json();
            toast.custom(t => <Toast message={message} type={response.ok ? "Succès" : "Erreur"} t={t}/>);
        } catch (e) {
            toast.custom(t => <Toast message="Erreur lors du signalement" type="Erreur" t={t}/>);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                <div className="flex flex-col gap-y-3">
                    <div>
                        <Label name="Raison du signalement" id={"reason"}/>
                        <InputGroup name="Raison" focusColor="focus-within:outline-accent_blue">
                            <Input type="text" additionalClasses="w-full" ariaLabel="Raison du signalement"
                                   id="reason" {...register("reason")} />
                        </InputGroup>
                    </div>
                    <div>
                        <Label name="Détails du signalement" id={"reason"}/>
                        <Controller
                            name="details"
                            control={control}
                            render={({field}) => (
                                <textarea
                                    {...field}
                                    className="w-full h-[140px] resize-none rounded-[9px] outline outline-1 outline-whitish_border p-2 text-[12px] mt-1 focus-within:outline-accent_blue transition-all duration-300"
                                />
                            )}
                        />
                    </div>
                    <div className="flex flex-row w-full max-sm:flex-col max-sm:gap-y-2">
                        <Button variant="custom"
                                customClasses="rounded-[8px] font-semibold px-6 bg-accent_blue  text-white w-1/4 bg-accent_blue max-sm:w-full">
                            Signaler
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}
