import { newAddress } from "@/api/newAddress";
import { useMutation } from "@tanstack/react-query";

export default function useNewAddress() {
  return useMutation({
    mutationFn: newAddress,
  });
}