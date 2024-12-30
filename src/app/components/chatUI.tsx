// "use client";

// import { Button, Image, Input } from "@nextui-org/react";
// import { useState } from "react";
// import { FaRobot } from "react-icons/fa";
// import { FaArrowUpLong } from "react-icons/fa6";
// import { IoIosClose } from "react-icons/io";
// import useChatBot from "@/hooks/useChatBot";
// import { useForm } from "react-hook-form";

// interface FormData {
//   user_message: string;
// }

// interface ChatMessage {
//   id: string;
//   user: string;
//   message: string;
// }

// export default function ChatUI() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { mutate, isPending } = useChatBot();
//   const { register, handleSubmit, reset } = useForm<FormData>();
//   const toggleChat = () => setIsOpen(!isOpen);
//   const initialChats = [
//     {
//       id: "init-1",
//       user: "bot",
//       message: "안녕하세요! 무엇을 도와드릴까요?",
//     },
//     {
//       id: "init-2",
//       user: "bot",
//       message: "저는 챗봇입니다. 무엇이든 물어보세요!",
//     },
//   ];

//   const [chatArr, setChatArr] = useState(initialChats);

//   const onSubmit = (formData: FormData) => {
//     const newUserMessage: ChatMessage = {
//       id: `user-${Date.now()}`,
//       user: "user",
//       message: formData.user_message,
//     };
//     reset();
//     setChatArr((prev) => [...prev, newUserMessage]);

//     mutate(formData.user_message, {
//       onSuccess: (data) => {
//         const newBotMessage: ChatMessage = {
//           id: `bot-${Date.now()}`,
//           user: "bot",
//           message: data.data.content,
//         };

//         setChatArr((prev) => [...prev, newBotMessage]);
//       },
//     });
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-10">
//       {!isOpen && (
//         <button
//           onClick={toggleChat}
//           className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg
//           hover:animate-wiggle transition-all duration-300
//           active:scale-95 hover:shadow-xl"
//         >
//           채팅 문의 <FaRobot className="text-xl" />
//         </button>
//       )}

//       {isOpen && (
//         <div
//           className="bg-white rounded-lg shadow-lg border border-gray-200
//           animate-slide-up origin-bottom pb-1"
//         >
//           <div className="p-3 bg-gray-200 flex justify-between items-center rounded-t-lg">
//             <h3 className="font-semibold text-gray-600">Chatbot</h3>
//             <button
//               onClick={toggleChat}
//               className="text-gray-500 hover:text-gray-900"
//             >
//               <IoIosClose className="text-3xl" />
//             </button>
//           </div>
//           <div className="w-[400px] max-h-[600px] overflow-y-auto">
//             <div className="p-1 h-[600px]">
//               <div className="space-y-6 mt-3">
//                 {chatArr.map((chat, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center ${
//                       chat.user === "bot" ? "justify-start" : "justify-end"
//                     }`}
//                   >
//                     <Image
//                       src={
//                         chat.user === "bot"
//                           ? "/chat-bot.webp"
//                           : "/basic_profile.png"
//                       }
//                       className="min-w-[30px]"
//                       width={30}
//                       height={30}
//                     />
//                     <p
//                       className={`text-sm text-gray-700 ${
//                         chat.user === "bot" ? "bg-gray-100" : "bg-blue-100"
//                       } inline p-2 m-1 rounded-md`}
//                     >
//                       {chat.message}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <form
//             className="flex items-center gap-1 w-[390px] mx-auto"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <Input
//               type="text"
//               placeholder="메시지를 입력하세요."
//               radius="full"
//               required
//               {...register("user_message")}
//             />
//             <Button
//               size="sm"
//               color="primary"
//               className="h-[40px]"
//               radius="full"
//               type="submit"
//               isLoading={isPending}
//             >
//               {!isPending && <FaArrowUpLong className="text-lg" />}
//             </Button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button, Image } from "@nextui-org/react";
import { FaRobot } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { AssistantStream } from "openai/lib/AssistantStream";
import Markdown from "react-markdown";

interface ChatMessage {
  role: "user" | "assistant" | "code";
  text: string;
}

const Message = ({ role, text }: { role: string; text: string }) => {
  if (role === "user") {
    return (
      <div className="flex items-center justify-end">
        <Image
          src="/basic_profile.png"
          className="min-w-[30px]"
          width={30}
          height={30}
        />
        <p className="text-sm text-gray-700 bg-blue-100 inline p-2 m-1 rounded-md">
          {text}
        </p>
      </div>
    );
  }

  if (role === "assistant") {
    return (
      <div className="flex items-center justify-start">
        <Image
          src="/chat-bot.webp"
          className="min-w-[30px]"
          width={30}
          height={30}
        />
        <div className="text-sm text-gray-700 bg-gray-100 inline p-2 m-1 rounded-md">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    );
  }

  if (role === "code") {
    return (
      <div className="bg-gray-100 p-4 rounded-md font-mono">
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
};

export default function ChatUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "안녕하세요! 무엇을 도와드릴까요?",
    },
    {
      role: "assistant",
      text: "저는 챗봇입니다. 무엇이든 물어보세요!",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const createThread = async () => {
      const res = await fetch(`/api/assistants/threads`, {
        method: "POST",
      });
      const data = await res.json();
      setThreadId(data.threadId); // threadId가 제대로 설정되는지 콘솔로 확인
      console.log("Created thread ID:", data.threadId);
    };
    createThread();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !threadId) return; // threadId 체크 추가

    console.log("Using thread ID:", threadId); // 사용되는 threadId 확인

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: userInput }]);

    // Send message using the correct URL structure
    const response = await fetch(
      `/api/assistants/threads/${threadId}/messages`, // URL에 threadId 포함
      {
        method: "POST",
        body: JSON.stringify({
          content: userInput,
        }),
      }
    );

    const stream = AssistantStream.fromReadableStream(response.body);
    handleStream(stream);
  };

  const handleStream = (stream: AssistantStream) => {
    stream.on("textCreated", () => {
      setMessages((prev) => [...prev, { role: "assistant", text: "" }]);
    });

    stream.on("textDelta", (delta) => {
      if (delta.value != null) {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          lastMessage.text += delta.value;
          return newMessages;
        });
      }
    });

    stream.on("toolCallCreated", (toolCall) => {
      if (toolCall.type === "code_interpreter") {
        setMessages((prev) => [...prev, { role: "code", text: "" }]);
      }
    });

    stream.on("toolCallDelta", (delta, snapshot) => {
      if (delta.type === "code_interpreter" && delta.code_interpreter?.input) {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          lastMessage.text += delta.code_interpreter.input;
          return newMessages;
        });
      }
    });

    stream.on("event", (event) => {
      if (event.event === "thread.run.completed") {
        setInputDisabled(false);
      }
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
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 animate-slide-up origin-bottom pb-1">
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
                {messages.map((msg, index) => (
                  <Message key={index} role={msg.role} text={msg.text} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>

          <form
            className="flex items-center gap-1 w-[390px] mx-auto p-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="flex-1 p-2 border rounded-full"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="메시지를 입력하세요."
              disabled={inputDisabled}
            />
            <Button
              size="sm"
              color="primary"
              className="h-[40px]"
              radius="full"
              type="submit"
              isDisabled={inputDisabled}
            >
              <FaArrowUpLong className="text-lg" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
