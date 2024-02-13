import CustomSettingsRender from "@/app/components/App/CustomSettingsRender"
import {SettingsNavigation} from "@/app/components/App/Navigation/CustomProfileNavigation"

export default function page() {
    return (
        <>
            <div className="flex items-center h-[calc(8%+1px)] px-8 border-b border-whitish_border bg-white flex-grow">
                <h1 className="font-medium">Paramètres</h1>
            </div>
            <div className="flex items-center justify-between flex-col flex-grow">
                <SettingsNavigation/>
                <CustomSettingsRender/>
            </div>
        </>
    )
}