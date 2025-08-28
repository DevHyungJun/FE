import useDeleteAddress from "@/hooks/useDeleteAdress";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const useHandleDeleteAddress = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteAddress } = useDeleteAddress();

  const handleDeleteAddress = (id: string) =>
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

  return { handleDeleteAddress };
};

export default useHandleDeleteAddress;
