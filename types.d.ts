interface ButtonInterface {
  variant: "default" | "error" | "social";
  width?: string;
  disabled?: boolean;
  onClick?: () => void;
}
