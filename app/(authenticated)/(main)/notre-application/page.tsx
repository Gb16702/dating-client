import Logo from "@/app/components/UI/Logo";

export default function Page() {
    return (
        <>
            <section className="w-full h-full bg-white flex items-center justify-center flex-col">
                <div className="h-[50vh]">
                    <Logo withTitle size={"default"}/>
                    <div className="flex flex-col items-center justify-center gap-y-4 mt-[60px]">
                        <h1 className="text-[30px] font-bold tracking-wide">
                            Bientôt Disponible
                        </h1>
                        <h2 className="text-[18px] text-subtitle_foreground relative text-center px-2">
                            Notre future application mobile arrive. Restez à l'affut !
                        </h2>
                        <button
                            className="bg-accent_blue px-5 py-3.5 mt-[20px] max-sm:mt-[50px] text-white font-medium rounded-[12px] text-[12px] tracking-[0.08em]"
                            style={{
                                filter: "drop-shadow(4px 25px 10px rgba(17,12,254,0.16))",
                                background: "linear-gradient(45deg, rgba(17,12,254,0.75) 16%, rgba(62,23,244,1) 62%)",
                                boxShadow: "inset 0 -3px 12px #FFFFFF"
                            }}
                        >
                            RETOUR A L'ACCUEIL
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}