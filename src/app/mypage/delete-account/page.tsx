"use client";

import { Button, Input } from "@nextui-org/react";
import useGuestOut from "@/hooks/useGuestOut";
import useDeleteAccountAction from "./hooks/useDeleteAccountAction";

export default function DeleteAccount() {
  useGuestOut();
  const { handleSubmit, handleBack, register, isPending } =
    useDeleteAccountAction();

  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-800">
      <form
        className="flex flex-col w-[500px] mx-auto gap-3 border p-3 rounded-md"
        onSubmit={handleSubmit}
      >
        <h1 className="flex items-center gap-2 text-2xl extra-bold my-5">
          회원탈퇴
        </h1>
        <Input
          label="이메일을 입력해주세요"
          variant="underlined"
          required
          isClearable
          {...register("email")}
        />
        <Input
          label="비밀번호를 입력해주세요"
          variant="underlined"
          required
          isClearable
          type="password"
          {...register("password")}
        />

        <div className="w-full flex gap-1 mt-5">
          <Button className="w-1/2 bold" onClick={handleBack}>
            취소
          </Button>
          <Button
            className="w-1/2 bold"
            color="danger"
            type="submit"
            isLoading={isPending}
          >
            탈퇴
          </Button>
        </div>
      </form>
    </div>
  );
}
