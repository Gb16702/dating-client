export default function Loader(): JSX.Element {
  return (
    <>
      <svg
        className="spinner"
        width="18px"
        height="18px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="circle"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
    </>
  );
}
