"use client";

import { Button } from "@nextui-org/react";
import useSearchAddress from "@/hooks/useSearchAddress";
import { storeModalShowstep, storeEditMode } from "@/store";
import LoadingSpinner from "../LoadingSpinner";
import AddressModalLayout from "./AddressModalLayout";
import { SelectedAddress } from "@/app/order/[id]/types";
import AddressModalItem from "./AddressModalItem";

interface ModalProps {
  setSelectedAddress: (address: SelectedAddress) => void;
  setEditId: (id: string) => void;
}

export default function Modal({ setSelectedAddress, setEditId }: ModalProps) {
  const { data, isLoading } = useSearchAddress();
  const { setStep } = storeModalShowstep();
  const { setEditMode } = storeEditMode();

  const sortedData = data?.data
    ? [...data.data].sort((a, b) => b.is_default - a.is_default)
    : [];

  return (
    <AddressModalLayout title="배송지 정보" onClose={() => setStep(0)}>
      <Button
        variant="bordered"
        className="w-full"
        size="sm"
        onClick={() => {
          setStep(2);
          setEditMode(false);
        }}
      >
        배송지 추가하기
      </Button>
      {isLoading && (
        <div className="mt-10">
          <LoadingSpinner mode="1" />
        </div>
      )}
      {!isLoading && sortedData.length === 0 && (
        <p className="text-center mt-10 text-gray-600 text-[14px] sm:text-medium">
          등록된 배송지가 없습니다. 배송지를 추가해주세요
        </p>
      )}
      {sortedData?.map((address: SelectedAddress) => (
        <AddressModalItem
          key={address._id}
          address={address}
          setEditId={setEditId}
          setSelectedAddress={setSelectedAddress}
        />
      ))}
    </AddressModalLayout>
  );
}
