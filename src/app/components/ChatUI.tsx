"use client";

import React from "react";
import { Button, Image, Textarea } from "@nextui-org/react";
import { FaArrowUpLong } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import Markdown from "react-markdown";
import useChat from "./useChat";

const CHAT_BOT_IMAGE = "/chat-bot.webp";
const USER_DEFAULT_IMAGE = "/basic_profile.png";
const CHAT_HEIGHT = {
  mobile: "calc(100vh-180px)",
  desktop: "700px",
};

// ChatHeader: 상단 헤더
function ChatHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-7 sm:p-3 bg-white sm:bg-gray-100 flex justify-between items-center rounded-t-lg">
      <h3 className="hidden sm:block extra-bold text-gray-600 text-sm sm:text-medium">
        AI 채팅
      </h3>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
        <IoIosClose className="hidden sm:block text-3xl" />
      </button>
    </div>
  );
}

// ChatMessage: 메시지 단일 렌더링
function ChatMessage({
  role,
  text,
  profileImage,
}: {
  role: string;
  text: string;
  profileImage?: string;
}) {
  if (role === "user") {
    return (
      <div className="flex items-center justify-end">
        <Image
          src={profileImage || USER_DEFAULT_IMAGE}
          className="min-w-[30px]"
          width={30}
          height={30}
        />
        <p className="text-xs sm:text-sm text-gray-700 bg-blue-100 inline p-2 m-1 rounded-md">
          {text}
        </p>
      </div>
    );
  }
  if (role === "assistant") {
    return (
      <div className="flex items-center justify-start">
        <Image
          src={CHAT_BOT_IMAGE}
          className="min-w-[30px]"
          width={30}
          height={30}
        />
        <div className="text-xs sm:text-sm text-gray-700 bg-gray-100 inline p-2 m-1 rounded-md">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    );
  }
  if (role === "code") {
    return (
      <div className="bg-gray-100 p-4 rounded-md">
        {text.split("\n").map((line, index) => (
          <div key={index}>
            <span className="text-gray-500">{`${index + 1}. `}</span>
            {line}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// ChatMessages: 메시지 리스트 및 스크롤 관리
function ChatMessages({
  messages,
  loadingMessage,
  profileImage,
  messagesEndRef,
}: {
  messages: { role: string; text: string }[];
  loadingMessage: boolean;
  profileImage?: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div className="p-1">
      <div className="space-y-6 mt-3">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            role={msg.role}
            text={msg.text}
            profileImage={profileImage}
          />
        ))}
        <div ref={messagesEndRef} />
        {loadingMessage && (
          <div className="flex items-center justify-start">
            <Image
              src={CHAT_BOT_IMAGE}
              className="min-w-[30px]"
              width={30}
              height={30}
            />
            <div className="text-sm text-blue-600 bg-gray-100 inline p-2 m-1 rounded-md animate-bounce delay-200 bold">
              <Markdown className="text-sm sm:text-medium">
                답변을 작성중입니다...
              </Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ChatInputForm: 입력창 및 전송 버튼
function ChatInputForm({
  userInput,
  setUserInput,
  onSubmit,
  inputDisabled,
  isLoading,
  onClose,
}: {
  userInput: string;
  setUserInput: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputDisabled: boolean;
  isLoading: boolean;
  onClose: () => void;
}) {
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
  return (
    <form
      className="flex items-center gap-1 w-full mx-auto p-2"
      onSubmit={onSubmit}
    >
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
  );
}

// 메인 ChatUI 컨테이너
export default function ChatUI({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
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

  if (!isOpen) return null;
  return (
    <div className="bg-white rounded-none sm:rounded-lg shadow-lg border border-gray-200 animate-slide-up origin-bottom pb-1">
      <ChatHeader onClose={() => setIsOpen(false)} />
      <div
        className={`w-full h-[${CHAT_HEIGHT.mobile}] sm:w-[450px] sm:h-[${CHAT_HEIGHT.desktop}] overflow-y-auto scrollbar-hide`}
      >
        <ChatMessages
          messages={messages}
          loadingMessage={loadingMessage}
          profileImage={profileImage}
          messagesEndRef={messagesEndRef}
        />
      </div>
      <ChatInputForm
        userInput={userInput}
        setUserInput={setUserInput}
        onSubmit={(e) => {
          setUserInput("");
          handleSubmit(e);
        }}
        onClose={() => setIsOpen(false)}
        inputDisabled={inputDisabled || jsonIsLoading}
        isLoading={inputDisabled || jsonIsLoading}
      />
    </div>
  );
}
