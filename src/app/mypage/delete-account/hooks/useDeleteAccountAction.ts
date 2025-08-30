import useDeleteAccount from "@/hooks/useDeleteAccount";
import useLogout from "@/hooks/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface DeleteAccountForm {
  email: string;
  password: string;
}

const useDeleteAccountAction = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<DeleteAccountForm>();
  const { mutate: deleteAccount, isPending } = useDeleteAccount();
  const { mutate: logout } = useLogout();
  const handleBack = () => router.back();

  const onSubmit = (data: DeleteAccountForm) => {
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
            router.replace("/");
            logout(undefined, {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["authCheck"] });
                queryClient.setQueryData(["authCheck"], { isLoggedIn: false });
              },
            });
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

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    handleBack,
    isPending,
  };
};

export default useDeleteAccountAction;
