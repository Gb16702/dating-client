export default function Background(): JSX.Element {
  return (
    <div
      className={`fixed bg-black/[.32] h-screen w-full top-0 left-0 z-10 backdrop-blur-[3px]`}
    ></div>
  );
}
