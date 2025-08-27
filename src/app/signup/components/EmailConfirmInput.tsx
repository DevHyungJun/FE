import { Input, Button } from "@nextui-org/react";
import { ErrorMessage } from "@hookform/error-message";
import EmailAuthTimer from "./EmailAuthTimer";
import { useFormContext } from "react-hook-form";
import { SignupForm } from "@/types/signupForm";
import { formInDiv, errorS } from "../constants/signupFormStyle";
import { UseMutationResult } from "@tanstack/react-query";
import { ConfirmMail } from "@/types/signupConfirmMail";
import { emailConfirmV } from "@/app/validationRules";

interface EmailConfirmInputProps {
  confirmMail: UseMutationResult<any, Error, ConfirmMail, unknown>;
  onConfirm: () => void;
  countdown: number | null;
  expiredMessage: boolean;
  formatTime: (second: number | null) => string | undefined;
}

export default function EmailConfirmInput({
  confirmMail,
  onConfirm,
  countdown,
  expiredMessage,
  formatTime,
}: EmailConfirmInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignupForm>();

  return (
    <>
      <div className={formInDiv}>
        <Input
          type="text"
          label="이메일 인증"
          variant="underlined"
          required
          isClearable
          {...register("emailConfirm", emailConfirmV)}
          isDisabled={confirmMail.isSuccess}
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
          isLoading={confirmMail.isPending}
          isDisabled={confirmMail.isSuccess}
          className="bold"
        >
          인증
        </Button>
      </div>
      <div className="h-[20px]">
        <ErrorMessage
          errors={errors}
          name="emailConfirm"
          render={({ message }) => <p className={errorS}>{message}</p>}
        />
      </div>
    </>
  );
}
