import React from "react";
import { Image } from "@nextui-org/react";
import Markdown from "react-markdown";
import ChatMessage from "./ChatMessage";

const CHAT_BOT_IMAGE = "/chat-bot.webp";

interface ChatMessagesProps {
  messages: { role: string; text: string }[];
  loadingMessage: boolean;
  profileImage?: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function ChatMessages({
  messages,
  loadingMessage,
  profileImage,
  messagesEndRef,
}: ChatMessagesProps) {
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
