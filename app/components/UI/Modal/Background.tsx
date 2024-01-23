type ModalBackground = {
  intensity?: string;
};

export default function Background({
  intensity,
}: ModalBackground): JSX.Element {
  return (
    <div
      className={`fixed bg-black/[.5] h-screen w-full top-0 left-0 z-10 backdrop-blur-[3px]`}
    ></div>
  );
}
