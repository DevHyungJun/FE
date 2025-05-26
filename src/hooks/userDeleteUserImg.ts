import deleteUserImg from "@/api/deleteUserImg";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteUserImg() {
  return useMutation({
    mutationFn: deleteUserImg,
  });
}
