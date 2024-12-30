"use client";

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { usernameV } from "@/app/validationRules";
import { ErrorMessage } from "@hookform/error-message";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { useEffect } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useEditUsername from "@/hooks/useEditUsername";
import { useQueryClient } from "@tanstack/react-query";

interface EditUserInfoForm {
  username: string;
}

export default function EditUsername() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userInfo, isLoading } = useGetUserInfo();

  const { mutate: editUsername, isPending } = useEditUsername();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditUserInfoForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (userInfo?.data) {
      setValue("username", userInfo.data.username);
    }
  }, [userInfo]);

  const handleBack = () => router.back();

  const onSubmit = (data: EditUserInfoForm) => {
    if (userInfo?.data?.username === data.username) {
      Swal.fire({
        title: "닉네임이 변경되지 않았습니다.",
        icon: "warning",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    editUsername(data.username, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authCheck"] });
        router.push("/login");
        Swal.fire({
          title: "닉네임이 변경되었습니다. 다시 로그인해주세요.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      },
      onError: (error) => {
        Swal.fire({
          title: "닉네임 변경에 실패했습니다, 다시 시도해주세요.",
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
      },
    });
  };

  const errorS = "text-sm text-red-500";
  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-800">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          className="flex flex-col w-[500px] mx-auto gap-3 border p-3 rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="flex items-center gap-2 text-2xl font-semibold m-1">
            닉네임 변경
          </h1>
          <p className="text-sm m-1 text-red-500">
            닉네임 변경 시 재로그인을 해주셔야 합니다.
          </p>
          <Input
            label="변경할 닉네임을 입력해주세요"
            variant="underlined"
            required
            isClearable
            {...register("username", usernameV)}
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => <p className={errorS}>{message}</p>}
          />
          <div className="w-full flex gap-1 mt-5">
            <Button className="w-1/2" onClick={handleBack}>
              취소
            </Button>
            <Button
              className="w-1/2"
              color="primary"
              type="submit"
              isLoading={isPending}
            >
              변경
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
