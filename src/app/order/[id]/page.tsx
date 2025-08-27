"use client";

import { useOrderAddess } from "./hooks/useOrderAddress";
import AddressSection from "./components/AddressSection";
import OrderItems from "./components/OrderItems";
import PaymentSummary from "./components/PaymentSummary";
import PaymentButton from "./components/PaymentButton";
import AddressModals from "@/app/components/address/AddressModals";
import useOrder from "./hooks/useOrder";

export default function Order({ params }: { params: { id: string } }) {
  const { id } = params;
  const { editId, setEditId, selectedAddress, setSelectedAddress } =
    useOrderAddess();
  const { orderData, isLoading, setProductList, resultPrice, handleClickPay } =
    useOrder(id, selectedAddress);

  return (
    <div className="flex flex-col gap-5 max-w-[1400px] mx-auto p-1">
      <h1 className="text-2xl font-semibold">주문서</h1>
      <h2 className="text-lg font-semibold">
        주문 상품 {orderData?.data?.product_list.length || 0}개
      </h2>

      <AddressModals
        editId={editId}
        setSelectedAddress={setSelectedAddress}
        setEditId={setEditId}
      />

      <AddressSection selectedAddress={selectedAddress} />

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
