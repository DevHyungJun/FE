"use client";

import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { storeModalShowstep, storeAddressData } from "@/store";
import useEditAddress from "@/hooks/useEditAddress";
import AddressModalLayout from "./AddressModalLayout";
import AddressForm from "./AddressForm";
import { AddressData } from "@/types/address";
import { useEffect, useState } from "react";

interface EditAddressProps {
  editId: string;
  mypage?: boolean;
}

export default function EditAddress({
  editId,
  mypage = false,
}: EditAddressProps) {
  const queryClient = useQueryClient();
  const { setStep } = storeModalShowstep();
  const { resetAddressData } = storeAddressData();
  const { mutate: editAddress } = useEditAddress();
  const [initialData, setInitialData] = useState<Partial<AddressData>>({});

  useEffect(() => {
    const data = queryClient.getQueryData(["searchAddress"]) as {
      data: AddressData[];
    };
    const foundAddress = data?.data?.find((address) => address._id === editId);
    if (foundAddress) {
      setInitialData(foundAddress);
    }
  }, [editId, queryClient]);

  const handleClose = () => {
    resetAddressData();
    setStep(0);
  };

  const handleBack = !mypage ? () => setStep(1) : undefined;

  const handleSubmit = (data: AddressData) => {
    const addressData = {
      ...data,
      zipcode: data.zip_code,
      detail_address: data.detail_address || "",
    };
    delete (addressData as AddressData).zip_code;

    editAddress(
      { addressData, editId },
      {
        onSuccess: () => {
          resetAddressData();
          setStep(1);
          queryClient.invalidateQueries({ queryKey: ["searchAddress"] });
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "주소 수정 실패",
            text: "주소를 수정하지 못했습니다.",
          });
        },
      }
    );
  };

  if (!initialData._id) {
    return null;
  }

  return (
    <AddressModalLayout
      title="주소 수정"
      onClose={handleClose}
      onBack={handleBack}
    >
      <AddressForm
        onSubmit={handleSubmit}
        defaultValues={initialData}
        isEditMode={true}
      />
    </AddressModalLayout>
  );
}
