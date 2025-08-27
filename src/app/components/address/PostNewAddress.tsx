"use client";

import AddressModalLayout from "./AddressModalLayout";
import AddressForm from "./AddressForm";
import usePostNewAddress from "./hooks/usePostNewAddress";

interface PostNewAddressProps {
  mypage?: boolean;
}

export default function PostNewAddress({
  mypage = false,
}: PostNewAddressProps) {
  const { handleBack, handleClose, handleSubmit } = usePostNewAddress(mypage);

  return (
    <AddressModalLayout
      title="신규 주소 추가"
      onClose={handleClose}
      onBack={handleBack}
    >
      <AddressForm onSubmit={handleSubmit} isEditMode={false} />
    </AddressModalLayout>
  );
}
