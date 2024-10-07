'use client';

import { Button, Select, SelectItem, Textarea, Image } from "@nextui-org/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function Order() {
  const [selfDeliveryOption, setSelfDeliveryOption] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const selectDeliveryOption = [
    { id: 1, name: '문 앞에 놔주세요' },
    { id: 2, name: '경비실에 맡겨주세요' },
    { id: 3, name: '택배함에 넣어주세요' },
    { id: 4, name: '배송 전에 연락 주세요' },
    { id: 5, name: '직접입력' }
  ];

  const handleSelfWrite = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '5') {
      setSelfDeliveryOption(true);
      return;
    }
    setSelfDeliveryOption(false);
  };

  return (
    <div className="flex flex-col gap-5 max-w-[1400px] mx-auto p-1">
      <h1 className="text-2xl font-semibold m-1">주문서</h1>
      {showModal && <Modal />}
      <div className="border-b p-3 rounded-sm">
        <div className="flex justify-between">
          <div className="flex items-center gap-3 mb-5">
            <p className="text-lg font-semibold">홍길동</p>
            <p className="text-xs bg-gray-100 text-gray-600 rounded-sm p-0.5">기본 배송지</p>
          </div>
          <Button size="sm" onClick={() => setShowModal(true)}>배송지 변경</Button>
        </div>

        <div className="space-y-2 text-sm">
          <p>대구 동구 동북로 306-13 (정덕금탑빌라) 301호</p>
          <p>010-1234-5678</p>
          <Select
            items={selectDeliveryOption}
            label="배송 요청사항"
            placeholder="선택해주세요"
            size="sm"
            onChange={handleSelfWrite}
          >
            {selectDeliveryOption.map((option) => (
              <SelectItem
                key={option.id}
                value={option.id}
              >
                {option.name}
              </SelectItem>
            ))}
          </Select>
          {selfDeliveryOption && <Textarea placeholder="배송 요청사항을 입력해주세요" />}
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

const Modal = () => {
  return (
    <div className="p-3 bg-white border-2">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold mb-5">배송지 정보</h1>
        <button><IoClose className="text-2xl" /></button>
      </div>
      <Button variant="bordered" className="w-full">배송지 추가하기</Button>

      <div className="space-y-5 mt-3">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-1">
            <p className="text-lg font-semibold">홍길동</p>
            <p className="text-xs bg-gray-100 text-gray-600 rounded-sm p-0.5">기본 배송지</p>
          </div>
          <div className="space-y-1 text-sm">
            <p>대구 동구 동북로 306-13 (정덕금탑빌라) 301호</p>
            <p>010-1234-5678</p>
          </div>
          <div className="space-x-1">
            <button className="border px-2 py-0.5 rounded-md text-sm">수정</button>
          </div>
        </div>
      </div>

    </div>
  )
}