interface ButtonInterface {
  children: string | React.ReactNode;
  variant: "default" | "error" | "social";
  width?: string;
  loadable?: boolean;
  onClick?: () => void;
}

type InputType = "text" | "email" | "password" | "number" | "hidden";

interface InputProps {
  type: InputType;
  placeholder?: string;
  name: string;
  label?: string;
  value?: string;
  variant?: "default" | "error";
  generatePassword?: boolean;
  ariaLabel?: string;
  width?: string;
}

interface PasswordInputProps {
  name: string;
  placeholder?: string;
}
