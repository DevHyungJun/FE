"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import {
  usernameV,
  emailV,
  emailConfirmV,
  passwordV,
  passwordConfirmV,
} from "../validationRules";
import { SignupForm } from "../../../types/signupForm";
import { ErrorMessage } from "@hookform/error-message";
import useSendMail from "@/hooks/useSendMail";
import useConfirmMail from "@/hooks/useConfirmMail";
import useUsernameCheck from "@/hooks/useUsernameCheck";
import useSignup from "@/hooks/useSignup";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoMdMan, IoMdWoman } from "react-icons/io";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<SignupForm>({
    mode: "onChange", // 입력값이 변경될 때마다 유효성 검사
    reValidateMode: "onChange", // 입력값이 변경될 때마다 유효성 검사
  });

  // 이메일 인증시간 카운트다운
  const [countdown, setCountdown] = useState<number | null>(null);
  // 인증시간 만료 메세지 여부
  const [expriedMessage, setExpriedMessage] = useState(false);
  const [gender, setGender] = useState("");
  const [generation, setGeneration] = useState("");

  // 커스텀 훅 사용
  const sendMail = useSendMail();
  const confirmMail = useConfirmMail();
  const usernameCheck = useUsernameCheck();
  const signup = useSignup();

  // 시간 포맷 함수
  const formatTime = useCallback((second: number | null) => {
    if (second == null) return;
    const min = Math.floor(second / 60);
    const sec = second % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }, []);

  // 카운트다운 처리
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev! - 1), 1000);
    } else if (countdown === 0) {
      setCountdown(null);
      setExpriedMessage(true);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  // 이메일 전송
  const handleSendMail = async () => {
    const isValid = await trigger("email");
    if (isValid) {
      const emailValue = getValues("email");
      sendMail.mutate(emailValue, {
        onSuccess: () => {
          setCountdown(300);
          setExpriedMessage(false);
        },
      });
    }
  };

  // 이메일 인증
  const handleMailConfirm = async () => {
    const isValid = await trigger("emailConfirm");
    if (isValid) {
      const email = getValues("email");
      const emailCode = getValues("emailConfirm").trim();
      confirmMail.mutate(
        { email, emailCode },
        {
          onSuccess: () => {
            setCountdown(null);
            setExpriedMessage(false);
          },
        }
      );
    }
  };

  // 유저이름 중복확인
  const handleUsernameCheck = async () => {
    const isValid = await trigger("username");
    if (isValid) {
      const userName = getValues("username");
      usernameCheck.mutate(userName);
    }
  };

  // 회원가입 요청
  const onSubmit = (formData: SignupForm) => {
    if (
      !confirmMail.isSuccess ||
      !usernameCheck.isSuccess ||
      gender === "" ||
      generation === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "회원가입 실패",
        text: "모든 항목을 입력해주세요.",
      });
      return;
    }
    const { email, password, username } = formData;
    signup.mutate({
      email,
      password,
      username,
      gender,
      generation: Number(generation),
    });
  };

  const formInDiv = "flex items-end gap-1";
  const errorS = "text-sm text-red-500";

  const generations = [
    { key: 10, label: "10대" },
    { key: 20, label: "20대" },
    { key: 30, label: "30대" },
    { key: 40, label: "40대" },
    { key: 50, label: "50대" },
    { key: 60, label: "60대" },
    { key: 70, label: "70대" },
    { key: 80, label: "80대" },
    { key: 90, label: "90대" },
  ];

  return (
    <div className="min-h-[calc(100vh-333px)] sm:min-h-[calc(100vh-502px)] md:min-h-[calc(100vh-330px)] flex items-center justify-center text-gray-800">
      <form
        className="flex flex-col w-[500px] mx-auto gap-3 shadow-none p-3 rounded-md sm:shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-2 text-2xl extra-bold m-1">
          <IoPersonAddOutline />
          회원가입
        </div>
        {/* 이메일 입력&전송&에러메세지 */}
        <div className={formInDiv}>
          <Input
            type="email"
            label="이메일"
            variant="underlined"
            required
            isClearable
            {...register("email", emailV)}
            isDisabled={confirmMail.isSuccess}
          />
          <Button
            variant="bordered"
            size="sm"
            onClick={handleSendMail}
            isLoading={sendMail.isPending}
            isDisabled={confirmMail.isSuccess}
            className="bold"
          >
            전송
          </Button>
        </div>
        <div className="h-[20px]">
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className={errorS}>{message}</p>}
          />
        </div>
        {/* 이메일 인증입력&확인&에러메세지 */}
        <div className={formInDiv}>
          <Input
            type="text"
            label="이메일 인증"
            variant="underlined"
            required
            isClearable
            {...register("emailConfirm", emailConfirmV)}
            isDisabled={confirmMail.isSuccess}
          />
          <p className="text-sm text-yellow-500 m-1">{formatTime(countdown)}</p>
          <Button
            variant="bordered"
            size="sm"
            onClick={handleMailConfirm}
            isLoading={confirmMail.isPending}
            isDisabled={confirmMail.isSuccess}
            className="bold"
          >
            인증
          </Button>
        </div>
        {expriedMessage && (
          <p className="text-sm text-red-500">
            인증시간이 만료되었습니다. 다시 인증해주세요.
          </p>
        )}
        <div className="h-[20px]">
          <ErrorMessage
            errors={errors}
            name="emailConfirm"
            render={({ message }) => <p className={errorS}>{message}</p>}
          />
        </div>
        {/* 유저이름 입력&중복확인&에러메세지 */}
        <div className={formInDiv}>
          <Input
            type="text"
            label="유저이름"
            variant="underlined"
            required
            isClearable
            {...register("username", usernameV)}
          />
          <Button
            variant="bordered"
            size="sm"
            isLoading={usernameCheck.isPending}
            onClick={handleUsernameCheck}
            className="bold"
          >
            중복확인
          </Button>
        </div>
        <div className="h-[20px]">
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => <p className={errorS}>{message}</p>}
          />
        </div>
        {/* 비밀번호 입력&에러메세지 */}
        <Input
          type="password"
          placeholder="비밀번호"
          variant="underlined"
          required
          isClearable
          className="font-sans"
          {...register("password", passwordV)}
        />
        <div className="h-[20px]">
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className={errorS}>{message}</p>}
          />
        </div>
        {/* 비밀번호 확인 입력&에러메세지 */}
        <Input
          type="password"
          placeholder="비밀번호 확인"
          variant="underlined"
          required
          isClearable
          className="font-sans"
          {...register("passwordConfirm", passwordConfirmV)}
        />
        <div className="h-[20px]">
          <ErrorMessage
            errors={errors}
            name="passwordConfirm"
            render={({ message }) => <p className={errorS}>{message}</p>}
          />
        </div>
        <div className="flex gap-2 mb-5 bold">
          <div
            className={`flex items-center border ${
              gender === "man" && "bg-blue-100"
            } p-2 rounded-md text-gray-900 select-none cursor-pointer`}
            onClick={() => setGender("man")}
          >
            남성
            <IoMdMan className="text-2xl text-blue-500" />
          </div>
          <div
            className={`flex items-center border ${
              gender === "woman" && "bg-pink-100"
            } p-2 rounded-md text-gray-900 select-none cursor-pointer`}
            onClick={() => setGender("woman")}
          >
            여성 <IoMdWoman className="text-2xl text-pink-500" />
          </div>
        </div>
        <Select
          label="연령대"
          placeholder="고객님의 연령대를 선택해주세요"
          className="w-[50%]"
          selectedKeys={[generation]}
          onChange={(e) => setGeneration(e.target.value)}
          variant="underlined"
        >
          {generations.map((gen) => (
            <SelectItem key={gen.key} value={gen.key}>
              {gen.label}
            </SelectItem>
          ))}
        </Select>
        {/* 회원가입 버튼 */}
        <div className="flex justify-end">
          <Button
            type="submit"
            color="primary"
            isLoading={signup.isPending}
            className="bold"
          >
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
