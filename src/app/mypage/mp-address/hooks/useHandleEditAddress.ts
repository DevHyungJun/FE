import { storeModalShowstep, storeEditMode } from "@/store";

const useHandleEditAddress = (setAddress: (address: string) => void) => {
  const { setStep } = storeModalShowstep();
  const { setEditMode } = storeEditMode();

  const handleEditAddress = (id: string) => {
    setStep(4);
    setEditMode(true);
    setAddress(id);
  };

  return { handleEditAddress };
};

export default useHandleEditAddress;
