import Chat from "@/app/components/App/Chat";
import CustomProfileRender from "@/app/components/App/CustomProfileRender";
import CustomProfileNavigation from "@/app/components/App/Navigation/CustomProfileNavigation";

export default function Page() {
  return (
    <>
      <div className="flex items-center max-h-[calc(8%+1px)] px-8 border-b border-whitish_border bg-white flex-grow">
        <h1 className="font-medium">Personnalisation</h1>
      </div>
      <div className="flex items-center justify-between flex-col flex-grow">
        <Chat />
      </div>
    </>
  );
}
