"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useDeleteAccount from "@/hooks/useDeleteAccount";
import Swal from "sweetalert2";

interface DeleteAccountForm {
  email: string;
  password: string;
}

export default function DeleteAccount() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<DeleteAccountForm>();
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const handleBack = () => router.back();

  const onSubmit = (data: DeleteAccountForm) => {
    console.log(data);
    Swal.fire({
      title: "정말로 탈퇴하시겠습니까?",
      text: "모든 데이터가 삭제됩니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAccount(data, {
          onSuccess: () => {
            router.push("/");
          },
          onError: () => {
            Swal.fire({
              title: "회원탈퇴에 실패했습니다.",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-800">
      <form
        className="flex flex-col w-[500px] mx-auto gap-3 border p-3 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
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
