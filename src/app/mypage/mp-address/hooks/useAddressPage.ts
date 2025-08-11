"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { storeAddressData, storeEditMode, storeModalShowstep } from "@/store";
import useSearchAddress from "@/hooks/useSearchAddress";
import useDeleteAddress from "@/hooks/useDeleteAdress";
import useGuestOut from "@/hooks/useGuestOut";

export default function useAddressPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useSearchAddress();
  const { mutate: deleteAddress } = useDeleteAddress();
  const [address, setAddress] = useState("");
  const { setStep, step } = storeModalShowstep();
  const { resetAddressData } = storeAddressData();
  const { setEditMode } = storeEditMode();
  useGuestOut();
  const sortedData = [...(data?.data || [])].sort(
    (a, b) => b.is_default - a.is_default
  );

  useEffect(() => {
    if (step > 0) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.touchAction = "auto";
      document.body.style.overflow = "auto";
    }
    if (step === 0) {
      resetAddressData();
    }
  }, [step]);

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

  const handleNewAddress = () => {
    setStep(2);
    setEditMode(false);
  };

  const handleEditAddress = (id: string) => {
    setStep(4);
    setEditMode(true);
    setAddress(id);
  };

  return {
    data,
    isLoading,
    sortedData,
    step,
    address,
    handleDeleteAddress,
    handleNewAddress,
    handleEditAddress,
  };
}
