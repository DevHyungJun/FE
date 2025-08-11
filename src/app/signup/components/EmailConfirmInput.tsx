import { Input, Button } from "@nextui-org/react";
import { ErrorMessage } from "@hookform/error-message";
import EmailAuthTimer from "./EmailAuthTimer";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { SignupForm } from "@/types/signupForm";

interface EmailConfirmInputProps {
  register: UseFormRegisterReturn;
  error: FieldErrors<SignupForm>;
  isDisabled: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  formInDiv: string;
  errorS: string;
  countdown: number | null;
  expiredMessage: boolean;
  formatTime: (second: number | null) => string | undefined;
}

export default function EmailConfirmInput({
  register,
  error,
  isDisabled,
  isLoading,
  onConfirm,
  formInDiv,
  errorS,
  countdown,
  expiredMessage,
  formatTime,
}: EmailConfirmInputProps) {
  return (
    <>
      <div className={formInDiv}>
        <Input
          type="text"
          label="이메일 인증"
          variant="underlined"
          required
          isClearable
          {...register}
          isDisabled={isDisabled}
        />
        <EmailAuthTimer
          countdown={countdown}
          expiredMessage={expiredMessage}
          formatTime={formatTime}
        />
        <Button
          variant="bordered"
          size="sm"
          onClick={onConfirm}
          isLoading={isLoading}
          isDisabled={isDisabled}
          className="bold"
        >
          인증
        </Button>
      </div>
      <div className="h-[20px]">
        <ErrorMessage
          errors={error}
          name="emailConfirm"
          render={({ message }) => <p className={errorS}>{message}</p>}
        />
      </div>
    </>
  );
}
