import { errorS } from "../constants/signupFormStyle";

interface FormErrorMessageProps {
  errors: any;
  name: string;
}

export default function FormErrorMessage({
  errors,
  name,
}: FormErrorMessageProps) {
  if (!errors[name]) return null;
  return <p className={errorS}>{errors[name].message}</p>;
}
