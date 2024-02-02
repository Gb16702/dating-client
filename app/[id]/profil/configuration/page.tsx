import Config from "@/app/components/Config";
import { CitiesType } from "@/app/components/Forms/config/Cities";
import { cookies } from "next/headers";


export default async function Configuration(): Promise<JSX.Element> {
  const citiesResponse: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/cities/all`);
  const { cities }: CitiesType = await citiesResponse.json();

  const interestResponse: Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/interests/all`);
  let { interests } = await interestResponse.json();
  interests = interests.map((interest: { id: string; name: string }) => ({ id: interest.id, name: interest.name }));

  const token = cookies().get("token")?.value;

  return (
    <>
      <section className="min-h-fit w-[100%] max-w-[500px] max-lg:max-w-[100%] bg-white border border-whitish_border rounded-[12px] max-sm:rounded-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-6">
        <Config cities={cities} interests={interests} sessionId={token} />
      </section>
    </>
  );
}