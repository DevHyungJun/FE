import postUserImg from "@/api/postUserImg";
import { useMutation } from "@tanstack/react-query";

export default function usePostUserImg() {
  return useMutation({
    mutationFn: (file: FormData) => postUserImg(file),
  });
}
