import Muscial from "@/app/components/Icons/Musical";

type LogoProps = {
    withTitle?: boolean;
    size?: "default" | "small"
}

export default function Logo({withTitle, size = "default"}: LogoProps) {
    return (
        <div className="flex flex-col items-center justify-center">
            <div
                className={`bg-accent_blue flex items-center justify-center p-2 ${size === "small" ? "rounded-[5px]" : "rounded-[10px]"}`}
                style={{
                    filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.4))",
                    background: "linear-gradient(45deg, rgba(17,12,254,0.8) 16%, rgba(62,33,244,1) 62%)",
                }}>
                <Muscial
                    classes={`text-accent_blue stroke-none fill-white drop-shadow-none ${size === "small" ? "w-4 h-4" : "w-11 h-11"}`}
                    strokeWidth={0.5}/>
            </div>
            {withTitle && (
                <h2 className="mt-3.5 font-bold text-[#1E0B54]">Harmony</h2>
            )}
        </div>
    )
}