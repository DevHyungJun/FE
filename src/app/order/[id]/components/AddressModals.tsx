import Modal from "@/app/components/address/Modal";
import PostNewAddress from "@/app/components/address/PostNewAddress";
import DaumPost from "@/app/components/address/DaumPost";
import EditAddress from "@/app/components/address/EditAddress";

interface AddressModalsProps {
  step: number;
  editId: string;
  setSelectedAddress: (address: any) => void;
  setEditId: (id: string) => void;
}

export default function AddressModals({
  step,
  editId,
  setSelectedAddress,
  setEditId,
}: AddressModalsProps) {
  if (step === 1) {
    return (
      <Modal setSelectedAddress={setSelectedAddress} setEditId={setEditId} />
    );
  }
  if (step === 2) {
    return <PostNewAddress />;
  }
  if (step === 3) {
    return <DaumPost />;
  }
  if (step === 4) {
    return <EditAddress editId={editId} />;
  }
  return null;
}
