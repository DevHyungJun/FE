'use client';

import { Button, Image } from "@nextui-org/react";
import { useEffect } from "react";
import Modal from "../components/address/Modal";
import PostNewAddress from "../components/address/PostNewAddress";
import DaumPost from "../components/address/DaumPost";
import { storeModalShowstep } from "@/store";
import { storeAddressData } from "@/store";

export default function Order() {
  const { step, setStep } = storeModalShowstep();
  const { addressData, resetAddressData } = storeAddressData();

  useEffect(() => {
    if (step === 0) {
      resetAddressData();
    };
  }, [step]);

  return (
    <div className="flex flex-col gap-5 max-w-[1400px] mx-auto p-1">
      <h1 className="text-2xl font-semibold m-1">주문서</h1>
      {step === 1 && <Modal />}
      {step === 2 && <PostNewAddress />}
      {step === 3 && <DaumPost />}
      <div className="border-b p-3 rounded-sm">
        <div className="flex justify-between">
          <div className="flex items-center gap-3 mb-5">
            <p className="text-lg font-semibold">홍길동</p>
            <p className="text-xs bg-gray-100 text-gray-600 rounded-sm p-0.5">기본 배송지</p>
          </div>
          <Button size="sm" onClick={() => setStep(1)}>배송지 변경</Button>
        </div>

        <div className="space-y-2 text-sm">
          <p>대구 동구 동북로 306-13 (정덕금탑빌라) 301호</p>
          <p>010-1234-5678</p>
        </div>
      </div>

      <div className="border-b p-3 rounded-sm">
        <h2 className="text-lg font-semibold mb-5">주문 상품 1개</h2>
        <p className="text-sm mb-1">10월 10일 발송 예정</p>
        <div className="flex gap-3">
          <Image width={100}
            alt="product image"
            src="https://rich-shop-bucket.s3.ap-northeast-2.amazonaws.com/images/1727726688491_3816006_17079078956050_big.webp"
            className="rounded-md object-contain bg-gray-100"
          />
          <div className="space-y-2 text-sm">
            <p>2C TRUCKER BALL CAP - CHARCOAL</p>
            <p className="text-gray-500">M / 1개</p>
            <p className="font-semibold">34,710원</p>
          </div>
        </div>
      </div>

      <div className="border-b p-3 rounded-sm space-y-2">
        <h2 className="text-lg font-semibold mb-5">결제 금액</h2>
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">상품 금액</p>
          <p>34,710원</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-500">배송비</p>
          <p>3,000원</p>
        </div>
        <div className="flex justify-between font-semibold">
          <h3>총 결제 금액</h3>
          <p>37,710원</p>
        </div>
      </div>

      <Button color="primary">37,710원 결제하기</Button>
    </div>
  )
};