type ArrowProps = {
  classes: string;
}

export default function Arrow({classes}: ArrowProps): JSX.Element {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={classes}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>
    </>
  );
}
