"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { storeAddressData, storeModalShowstep } from "@/store";
import { SelectedAddress } from "../types";

export function useOrderAddess() {
  const queryClient = useQueryClient();
  const { step } = storeModalShowstep();
  const { resetAddressData } = storeAddressData();
  const [editId, setEditId] = useState("");
  const initialAddress = {} as SelectedAddress;
  const [selectedAddress, setSelectedAddress] = useState(initialAddress);
  const data = queryClient.getQueryData(["searchAddress"]);

  useEffect(() => {
    if (step > 0) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.touchAction = "auto";
      document.body.style.overflow = "auto";
    }
  }, [step]);

  useEffect(() => {
    if (!data) return;
    const foundAddress = (data as { data: SelectedAddress[] })?.data?.find(
      (address: SelectedAddress) => address._id === selectedAddress?._id
    );
    if (foundAddress) {
      setSelectedAddress(foundAddress);
    } else {
      setSelectedAddress(initialAddress);
    }
  }, [data, selectedAddress?._id, initialAddress]);

  useEffect(() => {
    if (step < 2) {
      resetAddressData();
    }
  }, [step, resetAddressData]);

  return {
    editId,
    setEditId,
    selectedAddress,
    setSelectedAddress,
  };
}
