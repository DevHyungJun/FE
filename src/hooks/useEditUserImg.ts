import editUserImg from "@/api/editUserImg";
import { useMutation } from "@tanstack/react-query";

export default function useEditUserImg() {
  return useMutation({
    mutationFn: (file: FormData) => editUserImg(file),
  });
}
