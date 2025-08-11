"use client";

import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { storeModalShowstep, storeAddressData } from "@/store";
import useNewAddress from "@/hooks/useNewAddress";
import AddressModalLayout from "./AddressModalLayout";
import AddressForm from "./AddressForm";
import { AddressData } from "@/types/address";

interface PostNewAddressProps {
  mypage?: boolean;
}

export default function PostNewAddress({
  mypage = false,
}: PostNewAddressProps) {
  const queryClient = useQueryClient();
  const { setStep, decrementStep } = storeModalShowstep();
  const { resetAddressData } = storeAddressData();
  const { mutate: newAddress } = useNewAddress();

  const handleClose = () => {
    resetAddressData();
    setStep(0);
  };

  const handleBack = !mypage ? decrementStep : undefined;

  const handleSubmit = (data: AddressData) => {
    const apiData = {
      ...data,
      zipcode: data.zip_code,
      detail_address: data.detail_address || "",
    };
    delete apiData.zip_code;

    newAddress(apiData, {
      onSuccess: () => {
        if (mypage) {
          queryClient.invalidateQueries({ queryKey: ["searchAddress"] });
        }
        resetAddressData();
        setStep(1);
      },
      onError: (error) => {
        Swal.fire({
          icon: "error",
          title: "주소 추가 실패",
          text: "주소를 추가하는 데 실패했습니다. 다시 시도해주세요.",
        });
      },
    });
  };

  return (
    <AddressModalLayout
      title="신규 주소 추가"
      onClose={handleClose}
      onBack={handleBack}
    >
      <AddressForm onSubmit={handleSubmit} isEditMode={false} />
    </AddressModalLayout>
  );
}
