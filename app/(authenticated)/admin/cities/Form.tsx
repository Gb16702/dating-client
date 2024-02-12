"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    zip: string;
};

const baseUrl = process.env.NEXT_PUBLIC_SERVER;

const updateCity = async (id: number, data: Inputs) => {
    const url = `${baseUrl}api/admin/cities/edit/${id}`;
    await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

const createCity = async (data: Inputs) => {
    const url = `${baseUrl}api/admin/cities/create`;

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

const Form = ({ value }: { value?: Inputs }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const router = useRouter();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        try {
            if (value) {
                await updateCity(value.id, data);
            } else {
                await createCity(data);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            router.refresh();
            router.back();
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-sm font-medium">Name</label>
            <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1"
                defaultValue={value?.name}
                {...register("name", { required: true })}
            />
            <label className="block text-sm font-medium">Latitude</label>
            <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1"
                defaultValue={value?.latitude}
                {...register("latitude", { required: true })}
            />
            <label className="block text-sm font-medium">Longitude</label>
            <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1"
                defaultValue={value?.longitude}
                {...register("longitude", { required: true })}
            />
            <label className="block text-sm font-medium">Zip</label>
            <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1"
                defaultValue={value?.zip}
                {...register("zip", { required: true })}
            />
            {errors.name && <span>This field is required</span>}
            <button className="border bg-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm h-10 px-4 py-2" type="submit">
                Submit
            </button>
        </form>
    );
};

export default Form;
