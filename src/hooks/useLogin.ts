import login from "@/api/login";
import { useMutation } from "@tanstack/react-query";
import { Login } from "@/types/login";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (loginData: Login) => login(loginData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      queryClient.setQueryData(["authCheck"], { isLoggedIn: true });
      router.replace("/");
    },
    onError: () => {
      Swal.fire({
        title: "로그인 실패",
        text: "이메일 또는 비밀번호가 일치하지 않습니다.",
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
}
