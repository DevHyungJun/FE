import deleteAddress from "@/api/deleteAddress";
import { useMutation } from '@tanstack/react-query';

export default function useDeleteAddress() {
  return useMutation({
    mutationFn: (addressId:string)=>deleteAddress(addressId),
  });
};