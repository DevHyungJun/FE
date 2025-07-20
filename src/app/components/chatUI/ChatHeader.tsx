import React from "react";
import { IoIosClose } from "react-icons/io";

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="hidden p-3 bg-white sm:bg-gray-100 sm:flex justify-between items-center rounded-t-lg">
      <h3 className="extra-bold text-gray-600 text-sm sm:text-medium">
        AI 채팅
      </h3>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
        <IoIosClose className="text-3xl" />
      </button>
    </div>
  );
}
