import { Input, Button } from "@nextui-org/react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { SignupForm } from "@/types/signupForm";
import { formInDiv, errorS } from "../constants/signupFormStyle";
import { emailV } from "@/app/validationRules";

interface EmailInputWithSendProps {
  isDisabled: boolean;
  isLoading: boolean;
  onSend: () => void;
}

export default function EmailInputWithSend({
  isDisabled,
  isLoading,
  onSend,
}: EmailInputWithSendProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignupForm>();

  return (
    <>
      <div className={formInDiv}>
        <Input
          type="email"
          label="이메일"
          variant="underlined"
          required
          isClearable
          {...register("email", emailV)}
          isDisabled={isDisabled}
        />
        <Button
          variant="bordered"
          size="sm"
          onClick={onSend}
          isLoading={isLoading}
          isDisabled={isDisabled}
          className="bold"
        >
          전송
        </Button>
      </div>
      <div className="h-[20px]">
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p className={errorS}>{message}</p>}
        />
      </div>
    </>
  );
}
