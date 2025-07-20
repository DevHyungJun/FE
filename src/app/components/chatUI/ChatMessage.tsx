import React from "react";
import { Image } from "@nextui-org/react";
import Markdown from "react-markdown";

const CHAT_BOT_IMAGE = "/chat-bot.webp";
const USER_DEFAULT_IMAGE = "/basic_profile.png";

interface ChatMessageProps {
  role: string;
  text: string;
  profileImage?: string;
}

export default function ChatMessage({
  role,
  text,
  profileImage,
}: ChatMessageProps) {
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
