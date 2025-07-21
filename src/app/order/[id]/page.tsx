"use client";

import { useOrderPage } from "./hooks/useOrderPage";
import AddressModals from "./components/AddressModals";
import AddressSection from "./components/AddressSection";
import OrderItems from "./components/OrderItems";
import PaymentSummary from "./components/PaymentSummary";
import PaymentButton from "./components/PaymentButton";

export default function Order({ params }: { params: { id: string } }) {
  const { id } = params;
  const {
    step,
    setStep,
    editId,
    setEditId,
    selectedAddress,
    setSelectedAddress,
    orderData,
    isLoading,
    setProductList,
    resultPrice,
    handleClickPay,
  } = useOrderPage(id);

  return (
    <div className="flex flex-col gap-5 max-w-[1400px] mx-auto p-1">
      <h1 className="text-2xl font-semibold">주문서</h1>
      <h2 className="text-lg font-semibold">
        주문 상품 {orderData?.data?.product_list.length || 0}개
      </h2>

      <AddressModals
        step={step}
        editId={editId}
        setSelectedAddress={setSelectedAddress}
        setEditId={setEditId}
      />

      <AddressSection
        selectedAddress={selectedAddress}
        onOpenAddressModal={() => setStep(1)}
      />

      <OrderItems
        isLoading={isLoading}
        orderData={orderData}
        setProductList={setProductList}
      />

      <PaymentSummary resultPrice={resultPrice} />

      <PaymentButton resultPrice={resultPrice} onClick={handleClickPay} />
    </div>
  );
}
