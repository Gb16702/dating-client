type ChevronProps = {
  classes: string;
  width?: number
}


export default function Chevron({classes, width}: ChevronProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={width ?? 2} stroke="currentColor" className={classes}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
