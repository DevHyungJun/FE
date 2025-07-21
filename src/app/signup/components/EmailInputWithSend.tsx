import { Input, Button } from "@nextui-org/react";
import { ErrorMessage } from "@hookform/error-message";

interface EmailInputWithSendProps {
  register: any;
  error: any;
  isDisabled: boolean;
  isLoading: boolean;
  onSend: () => void;
  formInDiv: string;
  errorS: string;
}

export default function EmailInputWithSend({
  register,
  error,
  isDisabled,
  isLoading,
  onSend,
  formInDiv,
  errorS,
}: EmailInputWithSendProps) {
  return (
    <>
      <div className={formInDiv}>
        <Input
          type="email"
          label="이메일"
          variant="underlined"
          required
          isClearable
          {...register}
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
          errors={error}
          name="email"
          render={({ message }) => <p className={errorS}>{message}</p>}
        />
      </div>
    </>
  );
}
