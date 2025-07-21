"use client";

import { Button, Input } from "@nextui-org/react";
import { ErrorMessage } from "@hookform/error-message";

import useGuestOut from "@/hooks/useGuestOut";
import { useEditPasswordForm } from "./hooks/useEditPasswordForm";
import { passwordInputObject } from "@/constants/editPassword";

export default function EditPasswordPage() {
  useGuestOut();
  const { register, handleSubmit, errors, isSubmitting, handleBack } =
    useEditPasswordForm();

  const errorS = "text-red-500 text-sm";
  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-800">
      <form
        className="flex flex-col w-[500px] mx-auto gap-3 border p-3 rounded-md"
        onSubmit={handleSubmit}
      >
        <h1 className="flex items-center gap-2 text-2xl extra-bold my-5">
          비밀번호 변경
        </h1>
        {passwordInputObject.map((input) => (
          <div key={input.label}>
            <Input
              label={input.label}
              variant="underlined"
              type={input.type}
              isClearable
              {...register(input.register, input.validation)}
            />
            <ErrorMessage
              errors={errors}
              name={input.register}
              render={({ message }) => <p className={errorS}>{message}</p>}
            />
          </div>
        ))}
        <div className="w-full flex gap-1 mt-5">
          <Button className="w-1/2 bold" onClick={handleBack}>
            취소
          </Button>
          <Button
            className="w-1/2 bold"
            color="primary"
            type="submit"
            isLoading={isSubmitting}
          >
            비밀번호 변경
          </Button>
        </div>
      </form>
    </div>
  );
}
