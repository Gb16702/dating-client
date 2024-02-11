"use client";

type SendProps = {
  classes: string;
  strokeWidth?: number;
};

export default function Send({ classes, strokeWidth }: SendProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className={classes} strokeWidth={strokeWidth ?? 2}>
      <path d="M12.4863 20C12.1678 20 11.8822 19.8038 11.7681 19.5062L8.6898 11.4712L0.486571 8.22913C0.189602 8.11177 -0.00396118 7.82308 6.15242e-05 7.50387C0.00432085 7.18442 0.205219 6.90094 0.505265 6.79138L18.9671 0.046746C19.2482 -0.0559509 19.5636 0.0136181 19.7747 0.225401C19.9865 0.436947 20.0558 0.752136 19.9534 1.03301L13.2087 19.4948C13.0987 19.796 12.8131 19.9974 12.4924 20C12.4901 20 12.4863 20 12.4863 20ZM2.93308 7.54196L9.56959 10.165C9.77001 10.2443 9.92808 10.404 10.0052 10.6049L12.4692 17.0365L17.9408 2.05927L2.93308 7.54196Z" />
    </svg>
  );
}