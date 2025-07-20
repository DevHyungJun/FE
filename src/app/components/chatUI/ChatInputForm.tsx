import React from "react";
import { Button, Textarea } from "@nextui-org/react";
import { FaArrowUpLong } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { CiShoppingTag } from "react-icons/ci";

interface ChatInputFormProps {
  userInput: string;
  setUserInput: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputDisabled: boolean;
  isLoading: boolean;
  onClose: () => void;
}

export default function ChatInputForm({
  userInput,
  setUserInput,
  onSubmit,
  inputDisabled,
  isLoading,
  onClose,
}: ChatInputFormProps) {
  // 엔터 전송, 쉬프트+엔터 줄바꿈 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<any>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // form submit 트리거
      const form = e.currentTarget.form;
      if (form) {
        const submitEvent = new Event("submit", {
          cancelable: true,
          bubbles: true,
        });
        form.dispatchEvent(submitEvent);
      }
    }
  };

  // 인기 상품 추천 버튼 클릭 핸들러
  const handlePopularProductRecommend = () => {
    const message = "쇼핑몰에서 인기있는 상품 하나를 추천해줘";
    setUserInput(message);

    // 자동으로 전송 이벤트 생성 및 실행
    setTimeout(() => {
      const submitEvent = new Event("submit", {
        cancelable: true,
        bubbles: true,
      });
      const form = document.querySelector("form");
      if (form) {
        form.dispatchEvent(submitEvent);
      }
    }, 100); // 약간의 지연으로 상태 업데이트 완료 후 전송
  };

  return (
    <div className="w-full">
      {/* 인기 상품 추천 버튼 */}
      <div className="mb-2">
        <Button
          size="sm"
          color="secondary"
          variant="flat"
          className="text-xs sm:text-sm"
          onClick={handlePopularProductRecommend}
          disabled={inputDisabled}
          startContent={<CiShoppingTag className="text-sm" />}
        >
          인기 상품 추천
        </Button>
      </div>

      <form className="flex items-center gap-1 w-full" onSubmit={onSubmit}>
        <Textarea
          type="text"
          className="flex-1"
          radius="full"
          minRows={1}
          maxRows={5}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="메시지를 입력하세요."
          disabled={inputDisabled}
          onKeyDown={handleKeyDown}
        />
        <div className="flex gap-1">
          <Button
            size="sm"
            color="danger"
            className="flex justify-center h-[40px] sm:hidden"
            radius="full"
            onClick={onClose}
          >
            <IoIosClose className="text-4xl" />
          </Button>
          <Button
            size="sm"
            color="primary"
            className="h-[40px]"
            radius="full"
            type="submit"
            isLoading={isLoading}
            isDisabled={userInput.trim() === ""}
          >
            {!inputDisabled && <FaArrowUpLong className="text-lg" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
