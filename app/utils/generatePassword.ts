export default function GeneratePassword(length: number): string {
  const CHARSET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]";
  let password: string = "";

  if (length <= 0) {
    const ERROR_MESSAGE: string = "Le paramètre doit être supérieur à 0";
    throw new Error(ERROR_MESSAGE);
  }

  return Array.from({length}, () => {
    return CHARSET[Math.floor(Math.random() * CHARSET.length)]
  }).join("");
}
