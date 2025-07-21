interface FormErrorMessageProps {
  errors: any;
  name: string;
  errorS: string;
}

export default function FormErrorMessage({
  errors,
  name,
  errorS,
}: FormErrorMessageProps) {
  if (!errors[name]) return null;
  return <p className={errorS}>{errors[name].message}</p>;
}
