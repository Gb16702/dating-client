type BarsProps = {
  classes: string;
  width?: number;
}

export default function Bars({classes, width}: BarsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={width ?? 1.5} className={classes}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
    </svg>
  );
}
