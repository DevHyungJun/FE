"use client";

import { Button, Image, Input } from "@nextui-org/react";
import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import useChatBot from "@/hooks/useChatBot";
import { useForm } from "react-hook-form";

interface FormData {
  user_message: string;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
}

export default function ChatUI() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useChatBot();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const toggleChat = () => setIsOpen(!isOpen);
  const initialChats = [
    {
      id: "init-1",
      user: "bot",
      message: "안녕하세요! 무엇을 도와드릴까요?",
    },
    {
      id: "init-2",
      user: "bot",
      message: "저는 챗봇입니다. 무엇이든 물어보세요!",
    },
  ];

  const [chatArr, setChatArr] = useState(initialChats);

  const onSubmit = (formData: FormData) => {
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      user: "user",
      message: formData.user_message,
    };
    reset();
    setChatArr((prev) => [...prev, newUserMessage]);

    mutate(formData.user_message, {
      onSuccess: (data) => {
        const newBotMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          user: "bot",
          message: data.data.content,
        };

        setChatArr((prev) => [...prev, newBotMessage]);
      },
    });
  };

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
          className="bg-white rounded-lg shadow-lg border border-gray-200 
          animate-slide-up origin-bottom pb-1"
        >
          <div className="p-3 bg-gray-200 flex justify-between items-center rounded-t-lg">
            <h3 className="font-semibold text-gray-600">Chatbot</h3>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-900"
            >
              <IoIosClose className="text-3xl" />
            </button>
          </div>
          <div className="w-[400px] max-h-[600px] overflow-y-auto">
            <div className="p-1 h-[600px]">
              <div className="space-y-6 mt-3">
                {chatArr.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${
                      chat.user === "bot" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <Image
                      src={
                        chat.user === "bot"
                          ? "/chat-bot.webp"
                          : "/basic_profile.png"
                      }
                      className="min-w-[30px]"
                      width={30}
                      height={30}
                    />
                    <p
                      className={`text-sm text-gray-700 ${
                        chat.user === "bot" ? "bg-gray-100" : "bg-blue-100"
                      } inline p-2 m-1 rounded-md`}
                    >
                      {chat.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <form
            className="flex items-center gap-1 w-[390px] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="text"
              placeholder="메시지를 입력하세요."
              radius="full"
              required
              {...register("user_message")}
            />
            <Button
              size="sm"
              color="primary"
              className="h-[40px]"
              radius="full"
              type="submit"
              isLoading={isPending}
            >
              {!isPending && <FaArrowUpLong className="text-lg" />}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
