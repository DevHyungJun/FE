import login from "@/api/login";
import { useMutation } from "@tanstack/react-query";
import { Login } from "../../types/login";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (loginData: Login)=> login(loginData),
    onSuccess: () => { 
      Swal.fire({
        title: '로그인 성공',
        text: '로그인이 완료되었습니다.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      });
      router.push('/');
    },
    onError: (error) => {
      Swal.fire({
        title: '로그인 실패',
        text: error.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  });
}