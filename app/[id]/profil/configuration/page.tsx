import Config from "@/app/components/Config";

export default function Configuration(): JSX.Element {
  return (
    <>
      <section className="min-h-fit w-[100%] max-w-[500px] max-lg:max-w-[100%] bg-white border border-whitish_border rounded-[12px] max-sm:rounded-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-6">
        <Config />
      </section>
    </>
  );
}
