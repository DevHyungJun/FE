"use client";

import { Button, Image, Input } from "@nextui-org/react";
import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

export default function ChatUI() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-10">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg 
          hover:animate-wiggle transition-all duration-300 
          active:scale-95 hover:shadow-xl"
        >
          채팅 문의 <FaRobot className="text-xl" />
        </button>
      )}

      {isOpen && (
        <div
          className="mt-2 w-[400px] h-[600px] bg-white rounded-lg shadow-lg border border-gray-200 
          animate-slide-up origin-bottom"
        >
          <div className="p-3 bg-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-600">Chatbot</h3>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-900"
            >
              <IoIosClose className="text-3xl" />
            </button>
          </div>
          <div className="p-1 h-[600px] relative">
            <div className="space-y-6 mt-3">
              <div className="flex items-center">
                <Image src="/basic_profile.png" width={30} height={30} />
                <p className="text-sm text-gray-700 bg-gray-100 inline p-2 m-1 rounded-md">
                  안녕하세요! 무엇을 도와드릴까요?
                </p>
              </div>

              <div className="flex items-center">
                <Image src="/basic_profile.png" width={30} height={30} />
                <p className="text-sm text-gray-700 bg-gray-100 inline p-2 m-1 rounded-md">
                  저는 챗봇입니다. 무엇이든 물어보세요!
                </p>
              </div>

              <div className="flex justify-end">
                <p className="text-sm text-gray-700 bg-blue-100 inline p-2 m-1 rounded-md">
                  상품 구매 방법을 알려주세요.
                </p>
              </div>
            </div>
            <div className="flex items-center absolute bottom-16 w-[390px]">
              <Input
                type="text"
                placeholder="메시지를 입력하세요."
                radius="full"
              />
              <Button
                size="sm"
                color="primary"
                className="h-[40px]"
                radius="full"
              >
                <FaArrowUpLong className="text-lg" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
