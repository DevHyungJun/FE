import deleteAccount from "@/api/deleteAccount";
import { useMutation } from "@tanstack/react-query";

interface AccountData {
  email: string;
  password: string;
}

export default function useDeleteAccount() {
  return useMutation({
    mutationFn: (accountData: AccountData) => deleteAccount(accountData),
  });
}
