import editUsername from "@/api/editUsername";
import { useMutation } from "@tanstack/react-query";

export default function useEditUsername() {
  return useMutation({
    mutationFn: (username: string) => editUsername(username),
  });
}
