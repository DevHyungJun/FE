"use client";

import { useEffect, useState } from "react";
import { storeAddressData, storeEditMode, storeModalShowstep } from "@/store";
import useSearchAddress from "@/hooks/useSearchAddress";
import useGuestOut from "@/hooks/useGuestOut";

export default function useAddressPage() {
  const { data, isLoading } = useSearchAddress();
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

  const handleNewAddress = () => {
    setStep(2);
    setEditMode(false);
  };

  return {
    data,
    isLoading,
    sortedData,
    address,
    handleNewAddress,
    setAddress,
  };
}
