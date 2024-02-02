"use client";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
};

const baseUrl = process.env.NEXT_PUBLIC_SERVER;

const updateInterest = async (id: number, data: Inputs) => {
  const url = `${baseUrl}api/interests/update/${id}`;
  await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const createInterest = async (data: Inputs) => {
  const url = `${baseUrl}api/interests/create`;
  console.log(data);
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const Form = ({ value }: { value?: { id: number; name: string } }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      if (value) {
        await updateInterest(value.id, data);
      } else {
        await createInterest(data);
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
      <input
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1"
        defaultValue={value?.name}
        {...register("name", { required: true })}
      />
      {errors.name && <span>This field is required</span>}
      <button className="border bg-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm h-10 px-4 py-2" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
