import CustomProfileRender from "@/app/components/App/CustomProfileRender";
import CustomProfileNavigation from "@/app/components/App/Navigation/CustomProfileNavigation";
import UpdateProfile from "@/app/components/App/UpdateProfile";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <div className="flex items-center h-[calc(8%+1px)] px-8 border-b border-whitish_border bg-white flex-grow">
        <h1 className="font-medium">Personnalisation</h1>
      </div>
      <div className="flex items-center justify-between flex-col flex-grow">
        <CustomProfileNavigation />
        <CustomProfileRender />
      </div>
    </>
  );
}
