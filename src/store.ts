import { create } from "zustand";

interface ModalShowstepState {
  step: number;
  setStep: (step: number) => void;
  decrementStep: () => void;
}

interface AddressData {
  receiver_name: string;
  receiver_phone: string;
  main_address: string;
  detail_address: string;
  zip_code: string;
  is_default: boolean;
  shipping_memo: string;
  delivery_option: string;
  self_delivery_memo: string;
}

interface AddressDataState {
  addressData: AddressData;
  setAddressData: (data: Partial<AddressData>) => void;
  resetAddressData: () => void;
}

const initialAddressData: AddressData = {
  receiver_name: '',
  receiver_phone: '',
  main_address: '',
  detail_address: '',
  zip_code: '',
  is_default: false,
  shipping_memo: '',
  delivery_option: '',
  self_delivery_memo: '',
};

export const storeAddressData = create<AddressDataState>((set) => ({
  addressData: initialAddressData,
  setAddressData: (data) => set((state) => ({
    addressData: { ...state.addressData, ...data }
  })),
  resetAddressData: () => set({ addressData: initialAddressData }),
}));

export const storeModalShowstep = create<ModalShowstepState>((set) => ({
  step: 0,
  setStep: (step: number) => set({ step }),
  decrementStep: () => set((state) => ({ step: state.step - 1 })),
}));