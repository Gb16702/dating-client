type CrossProps = {
  classes: string;
  onClick?: () => void
  border?: number;
};

export default function Cross({ classes, border, onClick }: CrossProps): JSX.Element {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={border ?? 2} stroke="currentColor" className={classes} onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </>
  );
}
