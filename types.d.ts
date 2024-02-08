type ButtonType = {
  variant: "default" | "error" | "social" | "custom";
  width?: string;
  disabled?: boolean;
  customClasses?: string;
  type?: "button" | "submit" | "reset";
  onClick?: any ;
}