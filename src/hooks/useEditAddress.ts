import editAddress from "@/api/editAddress";
import { useMutation } from "@tanstack/react-query";
import { AddressData } from "@/types/address";

export default function useEditAddress() {
  return useMutation({
    mutationFn: ({
      editId,
      addressData,
    }: {
      editId: string;
      addressData: AddressData;
    }) => editAddress(editId, addressData),
  });
}
