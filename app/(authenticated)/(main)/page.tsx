import {cookies} from "next/headers";
import MeetUsers from "@/app/components/App/MeetUsers";

export default async function Page() {
    return (
        <section className="flex flex-row max-md:w-full justify-center items-center h-full">
            <MeetUsers token={cookies().get("token")?.value}/>
        </section>
    );
}
