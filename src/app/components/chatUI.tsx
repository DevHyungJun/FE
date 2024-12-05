"use client";

import { useState } from "react";
import { FaRobot } from "react-icons/fa";

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
          <div className="p-4 border-b border-gray-300 flex justify-between items-center">
            <h3 className="font-semibold">Chatbot</h3>
            <button onClick={toggleChat} className="text-gray-500">
              ✖
            </button>
          </div>
          <div className="p-4">
            <p>챗봇 내용이 여기에 표시됩니다!</p>
          </div>
        </div>
      )}
    </div>
  );
}
