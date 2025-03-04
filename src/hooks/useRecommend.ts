"use client";

import useGetJson from "@/hooks/useGetJson";
import { useEffect, useState } from "react";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { AssistantStream } from "openai/lib/AssistantStream";
// 로그인 한 후 추천 상품을 가져올 수 있게 수정해야 함 현재는 로그인 전 먼저 로딩되기 때문에 로그인 후 새로고침을 하여야지만 추천 상품을 가져올 수 있음
export default function useRecommend() {
  const [threadId, setThreadId] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [flag, setFlag] = useState(false);
  const [productIds, setProductIds] = useState<string[]>([]);

  const { data: json, isLoading: jsonIsLoading, isSuccess } = useGetJson();
  const { data: userInfo, isError } = useGetUserInfo();

  const recommendText =
    "인 고객의 정보를 따라 추천 상품의 게시글 5개의 id를 중복된 id없이 json 배열로 전달해줘";
  const userInfoData = userInfo?.data
    ? {
        generation: userInfo.data.generation,
        gender: userInfo.data.gender === "man" ? "남성" : "여성",
      }
    : null;

  // Thread 생성
  useEffect(() => {
    if (!userInfo || isError) return;
    const storedProductIds = localStorage.getItem("productIds");
    if (storedProductIds) {
      setProductIds(JSON.parse(storedProductIds));
      setFlag(true);
      return;
    }
    const createThread = async () => {
      try {
        const res = await fetch(`/api/assistants/threads`, {
          method: "POST",
        });
        const data = await res.json();
        setThreadId(data.threadId);
      } catch (error) {
        console.error("Thread creation failed:", error);
        setMessage("추천 시스템 초기화에 실패했습니다.");
      }
    };
    createThread();
  }, [userInfo]);

  // JSON 데이터 처리 및 추천 프로세스
  useEffect(() => {
    if (flag) return;
    const processRecommendation = async () => {
      if (
        !isSuccess ||
        !threadId ||
        !userInfoData ||
        isProcessing ||
        jsonIsLoading
      ) {
        return;
      }

      setIsProcessing(true);

      try {
        // JSON 파일 생성
        const jsonBlob = new Blob([JSON.stringify(json)], {
          type: "application/json",
        });
        const jsonFile = new File([jsonBlob], "data.json", {
          type: "application/json",
        });
        const formData = new FormData();
        formData.append("file", jsonFile);

        // 파일 업로드
        await fetch("/api/assistants/files", {
          method: "POST",
          body: formData,
        });

        // 메시지 전송
        const { generation, gender } = userInfoData;
        const response = await fetch(
          `/api/assistants/threads/${threadId}/messages`,
          {
            method: "POST",
            body: JSON.stringify({
              content: `${generation}대의 연령대, ${gender + recommendText}`,
              jsonData: formData,
            }),
          }
        );

        if (response.body) {
          const stream = AssistantStream.fromReadableStream(response.body);
          handleStream(stream);
        }
      } catch (error) {
        console.error("Recommendation process failed:", error);
        setMessage("추천 처리 중 오류가 발생했습니다.");
        setIsProcessing(false);
      }
    };

    processRecommendation();
  }, [isSuccess, threadId, userInfoData, jsonIsLoading, json]);

  const handleStream = (stream: AssistantStream) => {
    stream.on("textCreated", () => {
      setMessage("추천 상품을 준비 중입니다.");
    });

    stream.on("textDelta", (delta) => {
      if (delta.value != null) {
        setMessage((prev) => prev + delta.value);
      }
    });

    stream.on("event", (event) => {
      if (event.event === "thread.run.completed") {
        setIsProcessing(false);
        setFlag(true);
      }
    });
  };

  useEffect(() => {
    if (flag && productIds.length === 0) {
      extractProductIds();
    }
  }, [flag]);

  const extractProductIds = () => {
    try {
      const regex = /\[([\s\S]*?)\]/;
      const match = regex.exec(message);
      if (match && match[1]) {
        // JSON 형식의 문자열로 만들기
        const jsonString = `[${match[1]}]`;
        // JSON 파싱
        const parsed = JSON.parse(jsonString);
        setProductIds(parsed);
        localStorage.setItem("productIds", jsonString);
      }
    } catch (error) {
      console.error("JSON 파싱 에러:", error);
      // 파싱 실패 시 빈 배열 설정
      setProductIds([]);
    }
  };

  return productIds.length ? productIds : null;
}
