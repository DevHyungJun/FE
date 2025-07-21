import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import useEditPassword from "@/hooks/useEditPassword";
import { EditPasswordForm } from "@/types/editPassword";

export const useEditPasswordForm = () => {
  const router = useRouter();
  const mutation = useEditPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPasswordForm>({
    mode: "onChange",
  });

  const handleBack = () => router.back();

  const showSuccessAlert = (title: string) => {
    Swal.fire({
      icon: "success",
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const showErrorAlert = (title: string) => {
    Swal.fire({
      icon: "error",
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const onSubmit = (data: EditPasswordForm) => {
    if (data.password !== data.new_password_confirm) {
      showErrorAlert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    const passwordData = {
      old_password: data.old_password,
      new_password: data.password,
    };

    mutation.mutate(passwordData, {
      onSuccess: () => {
        showSuccessAlert("비밀번호가 성공적으로 변경되었습니다.");
        router.replace("/");
      },
      onError: () => {
        showErrorAlert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
      },
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: mutation.isPending,
    handleBack,
  };
};
