"use client";

import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import ChatUI from "./ChatUI";

export default function ChatUIButton() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-10">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg
          hover:animate-wiggle transition-all duration-300 
          active:scale-95 hover:shadow-xl extra-bold"
        >
          채팅 문의 <FaRobot className="text-xl" />
        </button>
      )}

      {isOpen && <ChatUI isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
