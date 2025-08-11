import { Input, Button } from "@nextui-org/react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { SignupForm } from "@/types/signupForm";

interface UsernameInputWithCheckProps {
  register: UseFormRegisterReturn;
  error: FieldErrors<SignupForm>;
  isLoading: boolean;
  onCheck: () => void;
  formInDiv: string;
  errorS: string;
}

export default function UsernameInputWithCheck({
  register,
  error,
  isLoading,
  onCheck,
  formInDiv,
  errorS,
}: UsernameInputWithCheckProps) {
  return (
    <>
      <div className={formInDiv}>
        <Input
          type="text"
          label="유저이름"
          variant="underlined"
          required
          isClearable
          {...register}
        />
        <Button
          variant="bordered"
          size="sm"
          isLoading={isLoading}
          onClick={onCheck}
          className="bold"
        >
          중복확인
        </Button>
      </div>
      <div className="h-[20px]">
        <ErrorMessage
          errors={error}
          name="username"
          render={({ message }) => <p className={errorS}>{message}</p>}
        />
      </div>
    </>
  );
}
