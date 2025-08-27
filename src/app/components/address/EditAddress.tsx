"use client";

import AddressModalLayout from "./AddressModalLayout";
import AddressForm from "./AddressForm";
import useEditAddressLogic from "./hooks/useEditAddressLogic";

interface EditAddressProps {
  editId: string;
  mypage?: boolean;
}

export default function EditAddress({
  editId,
  mypage = false,
}: EditAddressProps) {
  const { initialData, handleSubmit, handleBack, handleClose } =
    useEditAddressLogic(editId, mypage);

  return initialData._id ? (
    <AddressModalLayout
      title="주소 수정"
      onClose={handleClose}
      onBack={handleBack}
    >
      <AddressForm
        onSubmit={handleSubmit}
        defaultValues={initialData}
        isEditMode={true}
      />
    </AddressModalLayout>
  ) : null;
}
