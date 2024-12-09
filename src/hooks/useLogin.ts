import login from "@/api/login";
import { useMutation } from "@tanstack/react-query";
import { Login } from "../../types/login";

export default function useLogin() {
  return useMutation({
    mutationFn: (loginData: Login)=> login(loginData)
  });
}