export type LabelProps = {
    id: string;
    name: string;
}

function Label({name, id}: LabelProps) {
  return (
    <>
      <label htmlFor={id} className="text-[12px] font-medium text-subtitle_foreground">
        {name}
      </label>
    </>
  );
}

export default Label;
