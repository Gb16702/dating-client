type BackProps = {
  className: string;
}

export default function Back({ className }: BackProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 11 10" className={className}>
      <path
        d="M3.43438 5.76459L9.41706 9.8605C9.67394 10.0363 9.99841 10.0466 10.2642 9.88763C10.5301 9.72848 10.6953 9.42525 10.6953 9.0959L10.6953 0.904265C10.6953 0.574912 10.5299 0.271481 10.2642 0.112531C10.1386 0.0373765 10.0001 1.02253e-06 9.86191 1.03621e-06C9.70709 1.05155e-06 9.55263 0.0466214 9.41706 0.139459L3.43438 4.23517C3.19251 4.40076 3.04564 4.68952 3.04564 4.99998C3.04564 5.31045 3.19251 5.59901 3.43438 5.76459Z"
      />
      <path
        d="M1.57538 9.32043C2.06134 9.32043 2.45508 8.89322 2.45508 8.36593L2.45508 1.4668C2.45508 0.939508 2.06134 0.512294 1.57538 0.512294C1.08942 0.512294 0.695681 0.939509 0.695682 1.4668L0.695683 8.36593C0.695683 8.89322 1.08942 9.32043 1.57538 9.32043Z"
      />
    </svg>
  );
}
