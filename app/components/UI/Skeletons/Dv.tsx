type DvProps = {
  classes?: string;
  children?: React.ReactNode;
}

export default function Dv({classes, children}: DvProps): JSX.Element {
  return (
    <>
      <div className={classes}>
        {children}
      </div>
    </>
  )
}