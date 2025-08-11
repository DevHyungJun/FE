import signup from "@/api/signup";
import { useMutation } from "@tanstack/react-query";
import { SignupData } from "@/types/signup";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: (signupData: SignupData) => signup(signupData),
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error: Error) => {
      Swal.fire({
        title: "회원가입 실패",
        text: error.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
}
