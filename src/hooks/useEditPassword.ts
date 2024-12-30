import editPassword from "@/api/editPassword";
import { useMutation } from "@tanstack/react-query";

interface Password {
  old_password: string;
  new_password: string;
}

export default function useEditPassword() {
  return useMutation({
    mutationFn: (password: Password) => editPassword(password),
  });
}
