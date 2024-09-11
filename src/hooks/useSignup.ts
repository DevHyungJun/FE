import signup from "@/api/signup";
import { useMutation } from "@tanstack/react-query";
import { SignupData } from "../../types/signup";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: (signupData: SignupData) => signup(signupData),
    onSuccess: () => {
      Swal.fire({
        title: '회원가입 성공',
        text: '로그인을 진행해주세요.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      });
      router.push('/login');
    },
    onError: (error: any) => {
      Swal.fire({
        title: '회원가입 실패',
        text: error.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
};