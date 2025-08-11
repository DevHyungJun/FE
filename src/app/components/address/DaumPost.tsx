"use client";

import DaumPostcodeEmbed from "react-daum-postcode";
import { storeModalShowstep, storeAddressData, storeEditMode } from "@/store";
import AddressModalLayout from "./AddressModalLayout";
import { daumPostAddressData } from "@/types/daumPost";

export default function DaumPost() {
  const { setStep } = storeModalShowstep();
  const { setAddressData } = storeAddressData();
  const { editMode } = storeEditMode();
  const previousStep = editMode ? 4 : 2;

  const handleComplete = (data: daumPostAddressData) => {
    setAddressData({
      main_address: `${data.roadAddress} ${data.buildingName || ""}`,
      zip_code: data.zonecode,
    });
    setStep(previousStep);
  };

  const handleClose = () => setStep(0);
  const handleBack = () => setStep(previousStep);

  return (
    <AddressModalLayout
      title="주소 검색"
      onClose={handleClose}
      onBack={handleBack}
    >
      <DaumPostcodeEmbed onComplete={handleComplete} />
    </AddressModalLayout>
  );
}
