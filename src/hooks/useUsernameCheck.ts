import usernameCheck from "@/api/usernameCheck";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function useUsernameCheck() {
  return useMutation({
    mutationFn: (username: string)=> usernameCheck(username),
    onSuccess: () => {
      Swal.fire({
        title: '유저이름 확인',
        text: '사용가능한 유저이름입니다.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        title: '유저이름 확인 실패',
        text: error.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
};