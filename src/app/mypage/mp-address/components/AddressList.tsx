import formatPhoneNumber from "@/util/formatPhoneNumber";
import { AddressData } from "@/types/address";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface AddressListProps {
  isLoading: boolean;
  sortedData: AddressData[];
  data: any;
  handleEditAddress: (id: string) => void;
  handleDeleteAddress: (id: string) => void;
}
const btnStyle = "border px-2 py-0.5 rounded-md text-sm bold";
export default function AddressList({
  isLoading,
  sortedData,
  data,
  handleDeleteAddress,
  handleEditAddress,
}: AddressListProps) {
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : data?.data.length === 0 ? (
        <p className="text-center mt-10 text-gray-600">
          등록된 배송지가 없습니다 배송지를 추가해주세요
        </p>
      ) : (
        sortedData?.map((address) => (
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
                  onClick={() => handleEditAddress(address?._id)}
                >
                  수정
                </button>
                <button
                  className={btnStyle}
                  onClick={() => handleDeleteAddress(address?._id)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
