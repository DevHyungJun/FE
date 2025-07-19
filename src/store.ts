import { create } from "zustand";
import { persist } from "zustand/middleware";

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
}

interface AddressDataState {
  addressData: AddressData;
  setAddressData: (data: Partial<AddressData>) => void;
  resetAddressData: () => void;
}

interface EditModeState {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

interface OrderData {
  product: string;
  quantity: number;
}

const initialAddressData: AddressData = {
  receiver_name: "",
  receiver_phone: "",
  main_address: "",
  detail_address: "",
  zip_code: "",
  is_default: false,
  shipping_memo: "",
};

export const storeAddressData = create<AddressDataState>((set) => ({
  addressData: initialAddressData,
  setAddressData: (data) =>
    set((state) => ({
      addressData: { ...state.addressData, ...data },
    })),
  resetAddressData: () => set({ addressData: initialAddressData }),
}));

export const storeModalShowstep = create<ModalShowstepState>((set) => ({
  step: 0,
  setStep: (step: number) => set({ step }),
  decrementStep: () => set((state) => ({ step: state.step - 1 })),
}));

export const storeEditMode = create<EditModeState>((set) => ({
  editMode: false,
  setEditMode: (editMode) => set({ editMode }),
}));

export const storeOrderData = create<{
  orderData: OrderData[];
  setOrderData: (data: OrderData[]) => void;
  clearOrderData: () => void;
}>()(
  persist(
    (set) => ({
      orderData: [],
      setOrderData: (data: OrderData[]) =>
        set((state) => ({ orderData: [...state.orderData, ...data] })),
      clearOrderData: () => set({ orderData: [] }),
    }),
    { name: "orderData" }
  )
);

export const chatUIState = create<{
  chatUI: boolean;
  setChatUI: () => void;
  clearChatUI: () => void;
}>((set) => ({
  chatUI: false,
  setChatUI: () => set({ chatUI: true }),
  clearChatUI: () => set({ chatUI: false }),
}));
