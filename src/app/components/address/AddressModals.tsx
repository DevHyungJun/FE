import Modal from "@/app/components/address/Modal";
import PostNewAddress from "@/app/components/address/PostNewAddress";
import DaumPost from "@/app/components/address/DaumPost";
import EditAddress from "@/app/components/address/EditAddress";
import { storeModalShowstep } from "@/store";
import { SelectedAddress } from "@/app/order/[id]/types";

interface AddressModalsProps {
  editId: string;
  mypage?: boolean;
  setSelectedAddress?: (address: SelectedAddress) => void;
  setEditId?: (id: string) => void;
}

export default function AddressModals({
  editId,
  mypage = false,
  setSelectedAddress,
  setEditId,
}: AddressModalsProps) {
  const { step } = storeModalShowstep();

  switch (step) {
    case 1:
      if (!mypage && setSelectedAddress && setEditId) {
        return (
          <Modal
            setSelectedAddress={setSelectedAddress}
            setEditId={setEditId}
          />
        );
      }
      return null;
    case 2:
      return <PostNewAddress mypage={mypage} />;
    case 3:
      return <DaumPost />;
    case 4:
      return <EditAddress editId={editId} mypage={mypage} />;
    default:
      return null;
  }
}
