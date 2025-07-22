"use client";

import React from "react";
import useChat from "./useChat";
import { chatUIState } from "@/store";
import { ChatHeader, ChatMessages, ChatInputForm } from "./chatUI/index";

// 메인 ChatUI 컨테이너
export default function ChatUI({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { clearChatUI } = chatUIState();
  const {
    messages,
    userInput,
    setUserInput,
    inputDisabled,
    loadingMessage,
    handleSubmit,
    messagesEndRef,
    profileImage,
    jsonIsLoading,
  } = useChat(isOpen);

  const handleClose = () => {
    setIsOpen(false);
    clearChatUI();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 w-screen h-[100dvh] z-[9999] bg-white sm:static sm:w-[450px] sm:h-[75vh] sm:z-[9999] sm:rounded-lg sm:shadow-lg sm:border sm:border-gray-200 animate-slide-up origin-bottom flex flex-col">
      <ChatHeader onClose={handleClose} />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <ChatMessages
          messages={messages}
          loadingMessage={loadingMessage}
          profileImage={profileImage}
          messagesEndRef={messagesEndRef}
        />
      </div>
      <div className="flex-shrink-0 p-2 bg-white border-t border-gray-200">
        <ChatInputForm
          userInput={userInput}
          setUserInput={setUserInput}
          onSubmit={(e: React.FormEvent) => {
            setUserInput("");
            handleSubmit(e);
          }}
          onClose={handleClose}
          inputDisabled={inputDisabled || jsonIsLoading}
          isLoading={inputDisabled || jsonIsLoading}
        />
      </div>
    </div>
  );
}
