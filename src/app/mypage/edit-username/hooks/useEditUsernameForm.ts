import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import useEditUsername from "@/hooks/useEditUsername";
import { EditUsernameFormValues } from "@/types/editUsername";

const useEditUsernameForm = (
  register: UseFormRegister<EditUsernameFormValues>,
  handleSubmit: UseFormHandleSubmit<EditUsernameFormValues, undefined>,
  errors: FieldErrors<EditUsernameFormValues>,
  setValue: UseFormSetValue<EditUsernameFormValues>
) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userInfo, isLoading: isUserLoading } = useGetUserInfo();
  const { mutate: editUsername, isPending: isSubmitting } = useEditUsername();

  useEffect(() => {
    if (userInfo?.data) {
      setValue("username", userInfo.data.username);
    }
  }, [userInfo, setValue]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const showSuccessAlert = (title: string) => {
    Swal.fire({
      title,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const showErrorAlert = (title: string) => {
    Swal.fire({
      title,
      icon: "error",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const onSubmit = useCallback(
    (data: EditUsernameFormValues) => {
      if (userInfo?.data?.username === data.username) {
        showErrorAlert("닉네임이 변경되지 않았습니다.");
        return;
      }
      editUsername(data.username, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["authCheck"] });
          router.push("/login");
          showSuccessAlert("닉네임이 변경되었습니다. 다시 로그인해주세요.");
        },
        onError: () => {
          showErrorAlert("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
        },
      });
    },
    [userInfo?.data?.username, editUsername, queryClient, router]
  );

  return {
    isUserLoading,
    isSubmitting,
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    handleBack,
  };
};

export default useEditUsernameForm;
