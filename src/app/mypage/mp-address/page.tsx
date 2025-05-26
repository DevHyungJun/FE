"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import useDeleteAddress from "@/hooks/useDeleteAdress";
import useSearchAddress from "@/hooks/useSearchAddress";
import formatPhoneNumber from "@/util/formatPhoneNumber";
import { Button } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import PostNewAddress from "@/app/components/address/PostNewAddress";
import EditAddress from "@/app/components/address/EditAddress";
import DaumPost from "@/app/components/address/DaumPost";
import { storeAddressData, storeEditMode, storeModalShowstep } from "@/store";
import { useEffect, useState } from "react";
import useGuestOut from "@/hooks/useGuestOut";

export default function MpAddress() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useSearchAddress();
  const { mutate: deleteAddress } = useDeleteAddress();
  const [address, setAddress] = useState("");
  const { setStep, step } = storeModalShowstep();
  const { resetAddressData } = storeAddressData();
  const { setEditMode } = storeEditMode();
  const sortedData = [...(data?.data || [])].sort(
    (a: any, b: any) => b.is_default - a.is_default
  );
  useGuestOut();
  useEffect(() => {
    // 모달 켜졌을 때 배경 스크롤 막기
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

  const handleDeleteAdress = (id: string) => {
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

  const handleEditAddress = () => {
    setStep(4);
    setEditMode(true);
  };

  const btnStyle = "border px-2 py-0.5 rounded-md text-sm bold";
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
        {isLoading && <LoadingSpinner />}
        {data?.data.length === 0 && (
          <p className="text-center mt-10 text-gray-600">
            등록된 배송지가 없습니다 배송지를 추가해주세요
          </p>
        )}
        {sortedData?.map((address: any) => (
          <div className="mt-3" key={address?._id}>
            <div className="border-b-2 pb-2">
              <div className="flex items-center gap-2">
                <p className="text-lg bold">{address?.receiver_name}</p>
                {address?.is_default && (
                  <p className="text-xs bg-gray-100 text-gray-600 rounded-sm p-0.5 light">
                    기본 배송지
                  </p>
                )}
              </div>
              <div className="my-2 space-y-1 text-sm">
                <p>
                  {address?.main_address} {address?.detail_address}
                </p>
                <p>{address?.zip_code}</p>
                <p>{formatPhoneNumber(address?.receiver_phone)}</p>
                {address?.shipping_memo && <p>{address?.shipping_memo}</p>}
              </div>
              <div className="space-x-0.5">
                <button
                  className={btnStyle}
                  onClick={() => {
                    handleEditAddress();
                    setAddress(address?._id);
                  }}
                >
                  수정
                </button>
                <button
                  className={btnStyle}
                  onClick={() => handleDeleteAdress(address?._id)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {step === 2 && <PostNewAddress mypage={true} />}
      {step === 3 && <DaumPost />}
      {step === 4 && <EditAddress editId={address} mypage={true} />}
    </div>
  );
}
