type MenuProps = {
  onClick?: () => void;
};

export default function Menu({onClick}: MenuProps) {
  return (
    <>
      <button onClick={onClick} className="flex flex-col gap-y-[3.5px] w-[16px]">
        <div className="py-[1.2px] bg-black w-full"></div>
        <div className="py-[1.2px]  bg-black w-full"></div>
        <div className="py-[1.2px] bg-black w-full"></div>
      </button>
    </>
  );
}
