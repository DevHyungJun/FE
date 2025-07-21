import { Dispatch, SetStateAction } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import OrderDetail from "@/app/components/OrderDetail";
import type { OrderResponseData, ProductList } from "../types";

interface OrderItemsProps {
  isLoading: boolean;
  orderData: { data: { product_list: OrderResponseData[] } } | undefined;
  setProductList: Dispatch<SetStateAction<ProductList[]>>;
}

export default function OrderItems({
  isLoading,
  orderData,
  setProductList,
}: OrderItemsProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {orderData?.data?.product_list?.map((product: OrderResponseData) => (
        <OrderDetail
          key={product?.articleId}
          articleId={product?.articleId}
          quantity={product?.quantity}
          setProductList={setProductList}
        />
      ))}
    </>
  );
}
