import CustomProfileRender from "@/app/components/App/CustomProfileRender";
import CustomProfileNavigation from "@/app/components/App/Navigation/CustomProfileNavigation";
import UpdateProfile from "@/app/components/App/UpdateProfile";
import { cookies } from "next/headers";

export default async function Page(): Promise<JSX.Element> {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_SERVER}api/users/me`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${cookies().get("token")?.value}`
  //   }
  // })

  // const { data } = await response.json();

  return (
    <>
      <div className="flex items-center max-h-[calc(8%+1px)] px-8 border-b border-whitish_border bg-white flex-grow">
        <h1 className="font-medium">Personnalisation</h1>
      </div>
      <div className="flex items-center justify-between flex-col flex-grow">
        <CustomProfileNavigation />
        <CustomProfileRender />
        <UpdateProfile />
      </div>
    </>
  );
}
