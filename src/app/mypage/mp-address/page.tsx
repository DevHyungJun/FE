"use client";

import { Button } from "@nextui-org/react";

import AddressList from "./components/AddressList";
import useAddressPage from "./hooks/useAddressPage";
import AddressModals from "@/app/components/address/AddressModals";

export default function MpAddress() {
  const {
    data,
    isLoading,
    sortedData,
    step,
    address,
    handleDeleteAddress,
    handleNewAddress,
    handleEditAddress,
  } = useAddressPage();
  return (
    <div className="mx-auto max-w-[800px] text-gray-800">
      <div className="w-full p-5 bg-white rounded-md">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl extra-bold my-5">배송지 정보</h1>
        </div>
        <Button
          variant="bordered"
          className="w-full mb-5 bold"
          onClick={handleNewAddress}
        >
          배송지 추가하기
        </Button>
        <AddressList
          isLoading={isLoading}
          sortedData={sortedData}
          data={data}
          handleDeleteAddress={handleDeleteAddress}
          handleEditAddress={handleEditAddress}
        />
      </div>
      <AddressModals step={step} editId={address} mypage={true} />
    </div>
  );
}
