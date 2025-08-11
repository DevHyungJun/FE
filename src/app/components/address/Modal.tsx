"use client";

import { Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useSearchAddress from "@/hooks/useSearchAddress";
import useDeleteAddress from "@/hooks/useDeleteAdress";
import { storeModalShowstep, storeEditMode } from "@/store";
import LoadingSpinner from "../LoadingSpinner";
import formatPhoneNumber from "@/util/formatPhoneNumber";
import AddressModalLayout from "./AddressModalLayout";
import { SelectedAddress } from "@/app/order/[id]/types";

interface ModalProps {
  setSelectedAddress: (address: SelectedAddress) => void;
  setEditId: (id: string) => void;
}

export default function Modal({ setSelectedAddress, setEditId }: ModalProps) {
  const { data, isLoading } = useSearchAddress();
  const { mutate: deleteAddress } = useDeleteAddress();
  const queryClient = useQueryClient();
  const { setStep } = storeModalShowstep();
  const { setEditMode } = storeEditMode();

  const sortedData = data?.data
    ? [...data.data].sort((a, b) => b.is_default - a.is_default)
    : [];

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

  const handleSelectAddress = (address: SelectedAddress) => {
    setSelectedAddress(address);
    setStep(0);
  };

  const handleEditAddress = (id: string) => {
    setEditId(id);
    setStep(4);
    setEditMode(true);
  };

  return (
    <AddressModalLayout title="배송지 정보" onClose={() => setStep(0)}>
      <Button
        variant="bordered"
        className="w-full"
        size="sm"
        onClick={handleNewAddress}
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
        <div className="mt-3" key={address._id}>
          <div className="border-b-2 pb-2">
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">{address.receiver_name}</p>
              {address.is_default && (
                <p className="text-xs bg-gray-100 text-gray-600 rounded-sm p-0.5">
                  기본 배송지
                </p>
              )}
            </div>
            <div className="my-2 space-y-1 text-sm">
              <p>
                {address.main_address} {address.detail_address}
              </p>
              <p>{address.zip_code}</p>
              <p>{formatPhoneNumber(address.receiver_phone)}</p>
              {address.shipping_memo && <p>{address.shipping_memo}</p>}
            </div>
            <div className="space-x-0.5">
              <button
                className="border px-2 py-0.5 rounded-md text-sm"
                onClick={() => handleEditAddress(address._id)}
              >
                수정
              </button>
              <button
                className="border px-2 py-0.5 rounded-md text-sm"
                onClick={() => handleSelectAddress(address)}
              >
                선택
              </button>
              <button
                className="border px-2 py-0.5 rounded-md text-sm"
                onClick={() => handleDeleteAddress(address._id)}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </AddressModalLayout>
  );
}
