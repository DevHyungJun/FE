import login from "@/api/login";
import { useMutation } from "@tanstack/react-query";
import { Login } from "../../types/login";

export default function useLogin() {
  return useMutation({
    mutationFn: (loginData: Login) => login(loginData),
    onSuccess: () => {
      alert("로그인 성공");
    },
    onError: () => {
      alert("로그인 실패");
    },
  });
}
