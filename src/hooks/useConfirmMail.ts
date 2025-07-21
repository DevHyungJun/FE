import confirmMail from "@/api/confirmMail";
import { useMutation } from "@tanstack/react-query";
import { ConfirmMail } from "@/types/signupConfirmMail";
import Swal from "sweetalert2";

export default function useConfirmMail() {
  return useMutation({
    mutationFn: (emailData: ConfirmMail) => confirmMail(emailData),
    onSuccess: () => {
      Swal.fire({
        title: "이메일 인증",
        text: "이메일이 인증되었습니다.",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        title: "이메일 인증 실패",
        text: error.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
}
