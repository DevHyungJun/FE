"use client";

import { Button, Input } from "@nextui-org/react";
import useGuestOut from "@/hooks/useGuestOut";
import useEditUsernameForm from "./hooks/useEditUsernameForm";
import { usernameV } from "@/app/validationRules";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import FormErrorMessage from "@/app/signup/components/FormErrorMessage";

export default function EditUsernamePage() {
  useGuestOut();

  const {
    isUserLoading,
    isSubmitting,
    register,
    handleSubmit,
    errors,
    handleBack,
  } = useEditUsernameForm();

  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-800">
      {isUserLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          className="flex flex-col w-[500px] mx-auto gap-3 border p-3 rounded-md"
          onSubmit={handleSubmit}
        >
          <h1 className="flex items-center gap-2 text-2xl extra-bold my-5">
            닉네임 변경
          </h1>
          <p className="text-sm m-1 light text-red-500">
            *닉네임 변경 시 재로그인을 해주셔야 합니다.
          </p>
          <Input
            label="변경할 닉네임을 입력해주세요"
            variant="underlined"
            isRequired
            isClearable
            {...register("username", usernameV)}
          />
          <FormErrorMessage errors={errors} name="username" />
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
              변경
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
