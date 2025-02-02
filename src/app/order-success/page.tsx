"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { storeOrderData } from "@/store";
import usePostPayment from "@/hooks/usePostPayment";
import { useEffect, useMemo } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function OrderSuccess() {
  const { orderData, clearOrderData } = storeOrderData();
  const { mutate, isPending, isError } = usePostPayment();

  useEffect(() => {
    if (orderData.length === 0) return;
    mutate(orderData, {
      onSettled: () => {
        clearOrderData();
      },
    });
  }, [orderData]);

  const orderMessage = useMemo(
    () => ({
      headMessage: isError
        ? "주문이 실패하였습니다."
        : "주문이 완료되었습니다.",
      bodyMessage: isError ? "다시 시도해주세요" : "구매해주셔서 감사합니다.",
    }),
    [isError]
  );

  return (
    <div className="flex flex-col items-center gap-3 mt-10">
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2 className="text-lg bold m-1">{orderMessage.headMessage}</h2>
          <p className="text-gray-700 text-sm light">
            {orderMessage.bodyMessage}
          </p>
          {!isError && (
            <Link href="/mypage/order-history">
              <button className="text-sm border p-1 rounded-md mt-3">
                주문내역 확인하기
              </button>
            </Link>
          )}
          <div className="mt-40 border-t-2">
            <h2 className="text-lg bold mt-2">이런 상품은 어떠세요?</h2>
            <div className="flex gap-2 mt-3">
              <div>
                <img src="https://via.placeholder.com/150" alt="product" />
                <p>상품명</p>
                <p>가격</p>
              </div>
              <div>
                <img src="https://via.placeholder.com/150" alt="product" />
                <p>상품명</p>
                <p>가격</p>
              </div>
              <div>
                <img src="https://via.placeholder.com/150" alt="product" />
                <p>상품명</p>
                <p>가격</p>
              </div>
              <div>
                <img src="https://via.placeholder.com/150" alt="product" />
                <p>상품명</p>
                <p>가격</p>
              </div>
              <div>
                <img src="https://via.placeholder.com/150" alt="product" />
                <p>상품명</p>
                <p>가격</p>
              </div>
              <div>
                <img src="https://via.placeholder.com/150" alt="product" />
                <p>상품명</p>
                <p>가격</p>
              </div>
            </div>
          </div>
          <Link href="/products" className="w-full mt-10" passHref>
            <Button color="primary" className="w-full bold">
              쇼핑 계속하기
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
