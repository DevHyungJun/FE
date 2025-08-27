import { SelectedAddress } from "@/app/order/[id]/types";
import formatPhoneNumber from "@/util/formatPhoneNumber";
import useChangeAddress from "./hooks/useChangeAddress";

interface AddressModalItemProps {
  address: SelectedAddress;
  setSelectedAddress: (address: SelectedAddress) => void;
  setEditId: (id: string) => void;
}

const AddressModalItem = ({
  address,
  setSelectedAddress,
  setEditId,
}: AddressModalItemProps) => {
  const { handleSelectAddress, handleEditAddress, handleDeleteAddress } =
    useChangeAddress(setSelectedAddress, setEditId);

  return (
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
  );
};

export default AddressModalItem;
