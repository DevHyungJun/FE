"use client";

import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import ChatUI from "./ChatUI";
import { chatUIState } from "@/store";

export default function ChatUIButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { setChatUI, clearChatUI, chatUI } = chatUIState();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "auto";
      setChatUI();
    } else {
      document.body.style.overflow = "hidden";
      clearChatUI();
    }
  };

  return (
    <>
      {chatUI && (
        <div
          className="hidden sm:block fixed inset-0 bg-black bg-opacity-50 z-[9998]"
          onClick={() => {
            setIsOpen(false);
            clearChatUI();
          }}
        />
      )}

      <div
        className={`fixed z-[9999] ${
          isOpen
            ? "w-full right-0 bottom-0 sm:w-auto sm:bottom-4 sm:right-2"
            : "bottom-4 right-2"
        }`}
      >
        {!isOpen && (
          <button
            onClick={toggleChat}
            className="text-[14px] md:text-[16px] p-2 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white sm:p-3 rounded-full shadow-lg
            hover:animate-wiggle transition-all duration-300 
            active:scale-95 hover:shadow-xl extra-bold"
          >
            채팅 문의 <FaRobot className="text-xl" />
          </button>
        )}

        <ChatUI isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}
