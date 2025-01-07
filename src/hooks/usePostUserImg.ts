import postUserImg from "@/api/postuserImg";
import { useMutation } from "@tanstack/react-query";

export default function usePostUserImg() {
  return useMutation({
    mutationFn: (file: FormData) => postUserImg(file),
  });
}
