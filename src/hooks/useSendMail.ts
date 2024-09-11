import sendMail from "@/api/sendMail";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function useSendMail() {
  return useMutation({
    mutationFn: (email: string)=> sendMail(email),
    onSuccess: () => {
      Swal.fire({
        title: '이메일 전송',
        text: '이메일이 전송되었습니다.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        title: '이메일 전송 실패',
        text: error.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
};