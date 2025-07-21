import { Button } from "@nextui-org/react";

import formatPhoneNumber from "@/util/formatPhoneNumber";
import type { SelectedAddress } from "../types";

interface AddressSectionProps {
  selectedAddress: SelectedAddress;
  onOpenAddressModal: () => void;
}

export default function AddressSection({
  selectedAddress,
  onOpenAddressModal,
}: AddressSectionProps) {
  const hasAddress = selectedAddress?.receiver_name;

  return (
    <div className={`border-y p-3 rounded-sm ${!hasAddress && "border-b"}`}>
      <div className="flex justify-between items-start mb-5">
        {hasAddress ? (
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">
              {selectedAddress.receiver_name}
            </p>
            {selectedAddress.is_default && (
              <p className="text-xs bg-gray-100 text-gray-600 rounded-sm p-0.5">
                기본 배송지
              </p>
            )}
          </div>
        ) : (
          <div className="text-[14px] flex flex-col gap-1 sm:flex-row sm:text-medium text-gray-600">
            <p>배송지가 선택되지 않았습니다.</p>
            <p>배송지를 선택해주세요</p>
          </div>
        )}
        <Button size="sm" variant="flat" onClick={onOpenAddressModal}>
          {hasAddress ? "배송지 변경" : "배송지 선택"}
        </Button>
      </div>

      {hasAddress && (
        <div className="space-y-1 text-sm text-gray-800 font-medium">
          <p>
            {selectedAddress.main_address} {selectedAddress.detail_address}
          </p>
          <p>{formatPhoneNumber(selectedAddress.receiver_phone)}</p>
          <p>{selectedAddress.shipping_memo}</p>
        </div>
      )}
    </div>
  );
}
