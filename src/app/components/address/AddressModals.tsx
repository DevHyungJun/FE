import Modal from "@/app/components/address/Modal";
import PostNewAddress from "@/app/components/address/PostNewAddress";
import DaumPost from "@/app/components/address/DaumPost";
import EditAddress from "@/app/components/address/EditAddress";
import { AddressData } from "@/types/address";
import { SelectedAddress } from "@/app/order/[id]/types";

interface AddressModalsProps {
  step: number;
  editId: string;
  mypage?: boolean;
  setSelectedAddress?: (address: SelectedAddress) => void;
  setEditId?: (id: string) => void;
}

export default function AddressModals({
  step,
  editId,
  mypage = false,
  setSelectedAddress,
  setEditId,
}: AddressModalsProps) {
  if (step === 1 && !mypage && setSelectedAddress && setEditId) {
    return (
      <Modal setSelectedAddress={setSelectedAddress} setEditId={setEditId} />
    );
  }
  if (step === 2) {
    return <PostNewAddress mypage={mypage} />;
  }
  if (step === 3) {
    return <DaumPost />;
  }
  if (step === 4) {
    return <EditAddress editId={editId} mypage={mypage} />;
  }
  return null;
}
