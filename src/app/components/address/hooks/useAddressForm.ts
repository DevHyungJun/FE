import { DELIVERY_OPTIONS } from "@/constants/address";
import { storeAddressData } from "@/store";
import { AddressData } from "@/types/address";
import { useEffect, useState } from "react";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";

const useAddressForm = (
  onSubmit: SubmitHandler<AddressData>,
  defaultValues: Partial<AddressData>,
  setValue: UseFormSetValue<AddressData>
) => {
  const { addressData } = storeAddressData();
  const [selfDeliveryOption, setSelfDeliveryOption] = useState(false);
  const [deliveryMemo, setDeliveryMemo] = useState(
    defaultValues.shipping_memo || ""
  );

  useEffect(() => {
    if (defaultValues.shipping_memo) {
      const isDirectInput = !DELIVERY_OPTIONS.some(
        (option) => option.name === defaultValues.shipping_memo
      );
      if (isDirectInput) {
        setSelfDeliveryOption(true);
        setValue("shipping_memo", "직접입력");
      } else {
        setValue("shipping_memo", defaultValues.shipping_memo);
      }
    }
  }, [defaultValues.shipping_memo, setValue]);

  useEffect(() => {
    if (addressData.main_address || addressData.zip_code) {
      setValue("main_address", addressData.main_address || "");
      setValue("zip_code", addressData.zip_code || "");
    }
  }, [addressData, setValue]);

  const handleSelectChanges = (value: string) => {
    if (value === "직접입력") {
      setDeliveryMemo("");
      setSelfDeliveryOption(true);
    } else {
      setSelfDeliveryOption(false);
      setDeliveryMemo(value);
    }
    setValue("shipping_memo", value);
  };

  const internalOnSubmit: SubmitHandler<AddressData> = (data) => {
    const submissionData = {
      ...data,
      shipping_memo: selfDeliveryOption ? deliveryMemo : data.shipping_memo,
    };
    onSubmit(submissionData);
  };

  return {
    internalOnSubmit,
    handleSelectChanges,
    selfDeliveryOption,
    deliveryMemo,
    setDeliveryMemo,
  };
};

export default useAddressForm;
