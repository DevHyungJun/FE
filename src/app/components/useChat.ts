import { useState, useEffect, useRef } from "react";
import { AssistantStream } from "openai/lib/AssistantStream";
import useGetJson from "@/hooks/useGetJson";
import useGetUserInfo from "@/hooks/useGetUserInfo";

interface ChatMessage {
  role: "user" | "assistant" | "code";
  text: string;
}

export default function useChat(isOpen: boolean) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "안녕하세요! 저는 AI 챗봇입니다." },
    { role: "assistant", text: "무엇을 도와드릴까요?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [file, setFile] = useState<FormData | null>(null);
  const [threadId, setThreadId] = useState("");
  const currentMessageTextRef = useRef("");
  const { data: json, isLoading: jsonIsLoading, isSuccess } = useGetJson();
  const { data: userInfo } = useGetUserInfo();
  const profileImage = userInfo?.data?.profile_image;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 스크롤 관리
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    scrollToBottom();
  }, [isOpen]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 스레드 생성
  useEffect(() => {
    const createThread = async () => {
      const res = await fetch(`/api/assistants/threads`, { method: "POST" });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread();
  }, []);

  // json 데이터 파일 업로드 준비
  useEffect(() => {
    if (isSuccess) {
      const jsonBlob = new Blob([JSON.stringify(json)], {
        type: "application/json",
      });
      const file = new File([jsonBlob], "data.json", {
        type: "application/json",
      });
      const formData = new FormData();
      formData.append("file", file);
      setFile(formData);
    }
  }, [json, isSuccess]);
  useEffect(() => {
    if (file) fileUpload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  // 파일 업로드
  const fileUpload = async () => {
    if (!file) return;
    await fetch("/api/assistants/files", { method: "POST", body: file });
  };

  // 메시지 전송 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInputDisabled(true);
    setLoadingMessage(true);
    if (!userInput.trim() || !threadId) return;
    currentMessageTextRef.current = "";
    setMessages((prev) => [...prev, { role: "user", text: userInput }]);
    const response = await fetch(
      `/api/assistants/threads/${threadId}/messages`,
      {
        method: "POST",
        body: JSON.stringify({ content: userInput, jsonData: file }),
      }
    );
    if (response.body) {
      const stream = AssistantStream.fromReadableStream(response.body);
      handleStream(stream);
    }
  };
  // 스트림 핸들러
  const handleStream = (stream: AssistantStream) => {
    stream.on("textCreated", () => {
      setMessages((prev) => [...prev, { role: "assistant", text: "" }]);
    });
    stream.on("textDelta", (delta) => {
      if (delta.value != null) {
        setLoadingMessage(false);
        currentMessageTextRef.current += delta.value;
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          lastMessage.text = currentMessageTextRef.current;
          return newMessages;
        });
      }
    });
    stream.on("toolCallCreated", (toolCall) => {
      if (toolCall.type === "code_interpreter") {
        setMessages((prev) => [...prev, { role: "code", text: "" }]);
      }
    });
    stream.on("toolCallDelta", (delta) => {
      if (delta.type === "code_interpreter" && delta.code_interpreter?.input) {
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (delta.code_interpreter?.input) {
            lastMessage.text += delta.code_interpreter.input;
          }
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

  return {
    messages,
    userInput,
    setUserInput,
    inputDisabled,
    loadingMessage,
    handleSubmit,
    messagesEndRef,
    profileImage,
    jsonIsLoading,
  };
}
