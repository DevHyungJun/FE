import { SelectedAddress } from "@/app/order/[id]/types";
import useDeleteAddress from "@/hooks/useDeleteAdress";
import { storeEditMode, storeModalShowstep } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const useChangeAddress = (
  setSelectedAddress: (address: SelectedAddress) => void,
  setEditId: (id: string) => void
) => {
  const queryClient = useQueryClient();
  const { setEditMode } = storeEditMode();
  const { setStep } = storeModalShowstep();
  const { mutate: deleteAddress } = useDeleteAddress();

  const handleSelectAddress = (address: SelectedAddress) => {
    setSelectedAddress(address);
    setStep(0);
  };

  const handleDeleteAddress = (id: string) => {
    deleteAddress(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["searchAddress"] });
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "주소 삭제 실패",
          text: "주소를 삭제하지 못했습니다.",
        });
      },
    });
  };

  const handleEditAddress = (id: string) => {
    setEditId(id);
    setStep(4);
    setEditMode(true);
  };

  return { handleSelectAddress, handleDeleteAddress, handleEditAddress };
};

export default useChangeAddress;
