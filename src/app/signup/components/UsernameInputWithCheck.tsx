import { Input, Button } from "@nextui-org/react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { SignupForm } from "@/types/signupForm";
import { formInDiv, errorS } from "../constants/signupFormStyle";
import { usernameV } from "@/app/validationRules";

interface UsernameInputWithCheckProps {
  isLoading: boolean;
  onCheck: () => void;
}

export default function UsernameInputWithCheck({
  isLoading,
  onCheck,
}: UsernameInputWithCheckProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignupForm>();

  return (
    <>
      <div className={formInDiv}>
        <Input
          type="text"
          label="유저이름"
          variant="underlined"
          required
          isClearable
          {...register("username", usernameV)}
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
          errors={errors}
          name="username"
          render={({ message }) => <p className={errorS}>{message}</p>}
        />
      </div>
    </>
  );
}
