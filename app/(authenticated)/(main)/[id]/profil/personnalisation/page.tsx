import CustomProfileRender from "@/app/components/App/CustomProfileRender";
import CustomProfileNavigation from "@/app/components/App/Navigation/CustomProfileNavigation";

export default async function Page(): Promise<JSX.Element> {
    return (
        <>
            <div
                className="h-[71px] px-6 flex items-center gap-x-1 font-medium text-sm bg-white border-b border-whitish_border">
                Personnalisation
            </div>
            <div className="flex items-center justify-between flex-col flex-grow">
                <CustomProfileNavigation/>
                <CustomProfileRender/>
            </div>
        </>
    );
}
