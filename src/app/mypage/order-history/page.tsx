"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import ScrollUpButton from "@/app/components/ScrollUpButton";
import useGuestOut from "@/hooks/useGuestOut";
import { Button } from "@nextui-org/react";
import { useOrderHistory } from "./hooks/useOrderHistory";
import OrderItem from "./components/OrderItem";

export default function OrderHistoryPage() {
  useGuestOut();

  const {
    orders,
    isOrdersLoading,
    isEmpty,
    hasNextPage,
    isFetchingNextPage,
    handleNextPage,
  } = useOrderHistory();

  return (
    <div className="mx-auto max-w-[800px] text-gray-800">
      <div className="w-full p-5 bg-white rounded-md">
        <h1 className="text-2xl extra-bold my-5">주문조회</h1>
        {isOrdersLoading && !isFetchingNextPage ? (
          <LoadingSpinner />
        ) : isEmpty ? (
          <div className="flex justify-center">
            <p className="text-center text-gray-500 bold py-10">
              주문 내역이 없습니다.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <OrderItem key={order._id} order={order} />
            ))}
          </div>
        )}

        {hasNextPage && (
          <Button
            className="w-full"
            color="primary"
            onClick={handleNextPage}
            isLoading={isFetchingNextPage}
          >
            {isFetchingNextPage ? "로딩 중..." : "더 보기"}
          </Button>
        )}
      </div>
      <ScrollUpButton />
    </div>
  );
}
