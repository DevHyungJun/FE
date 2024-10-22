import editAddress from "@/api/editAddress";
import { useMutation } from "@tanstack/react-query";

export default function useEditAddress() {
  return useMutation({
    mutationFn: ({ editId, newAddressData }: { editId: string; newAddressData: any }) => editAddress(editId, newAddressData),
  });
};