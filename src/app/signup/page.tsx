"use client";

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import {
  usernameV,
  emailV,
  emailConfirmV,
  passwordV,
  passwordConfirmV,
} from "../validationRules";
import { SignupForm } from "@/types/signupForm";
import useSendMail from "@/hooks/useSendMail";
import useConfirmMail from "@/hooks/useConfirmMail";
import useUsernameCheck from "@/hooks/useUsernameCheck";
import useSignup from "@/hooks/useSignup";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IoPersonAddOutline } from "react-icons/io5";
import GenderSelect from "./components/GenderSelect";
import GenerationSelect from "./components/GenerationSelect";
import EmailInputWithSend from "./components/EmailInputWithSend";
import EmailConfirmInput from "./components/EmailConfirmInput";
import UsernameInputWithCheck from "./components/UsernameInputWithCheck";
import FormErrorMessage from "./components/FormErrorMessage";
import { EMAIL_AUTH_TIME_SEC, ERROR_MESSAGES } from "@/constants/signup";
import formatTime from "@/util/formatTime";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<SignupForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // 상태
  const [countdown, setCountdown] = useState<number | null>(null);
  const [expiredMessage, setExpiredMessage] = useState(false);
  const [gender, setGender] = useState("");
  const [generation, setGeneration] = useState("");

  // 커스텀 훅
  const sendMail = useSendMail();
  const confirmMail = useConfirmMail();
  const usernameCheck = useUsernameCheck();
  const signup = useSignup();

  // 카운트다운 처리
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev! - 1), 1000);
    } else if (countdown === 0) {
      setCountdown(null);
      setExpiredMessage(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const formatTimeCallback = useCallback(formatTime, []);

  // 이메일 전송
  const handleSendMail = async () => {
    const isValid = await trigger("email");
    if (isValid) {
      const emailValue = getValues("email");
      sendMail.mutate(emailValue, {
        onSuccess: () => {
          setCountdown(EMAIL_AUTH_TIME_SEC);
          setExpiredMessage(false);
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
            setExpiredMessage(false);
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
    const isFormValid =
      confirmMail.isSuccess &&
      usernameCheck.isSuccess &&
      gender !== "" &&
      generation !== "";
    if (!isFormValid) {
      Swal.fire({
        icon: "error",
        title: ERROR_MESSAGES.signupFail,
        text: ERROR_MESSAGES.requiredAll,
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
        {/* 이메일 입력&전송 */}
        <EmailInputWithSend
          register={register("email", emailV)}
          error={errors}
          isDisabled={confirmMail.isSuccess}
          isLoading={sendMail.isPending}
          onSend={handleSendMail}
          formInDiv={formInDiv}
          errorS={errorS}
        />
        {/* 이메일 인증 입력&확인 */}
        <EmailConfirmInput
          register={register("emailConfirm", emailConfirmV)}
          error={errors}
          isDisabled={confirmMail.isSuccess}
          isLoading={confirmMail.isPending}
          onConfirm={handleMailConfirm}
          formInDiv={formInDiv}
          errorS={errorS}
          countdown={countdown}
          expiredMessage={expiredMessage}
          formatTime={formatTimeCallback}
        />
        {/* 유저이름 입력&중복확인 */}
        <UsernameInputWithCheck
          register={register("username", usernameV)}
          error={errors}
          isLoading={usernameCheck.isPending}
          onCheck={handleUsernameCheck}
          formInDiv={formInDiv}
          errorS={errorS}
        />
        {/* 비밀번호 입력 */}
        <Input
          type="password"
          placeholder="비밀번호"
          variant="underlined"
          required
          isClearable
          className="font-sans"
          {...register("password", passwordV)}
        />
        <FormErrorMessage errors={errors} name="password" errorS={errorS} />
        {/* 비밀번호 확인 입력 */}
        <Input
          type="password"
          placeholder="비밀번호 확인"
          variant="underlined"
          required
          isClearable
          className="font-sans"
          {...register("passwordConfirm", passwordConfirmV)}
        />
        <FormErrorMessage
          errors={errors}
          name="passwordConfirm"
          errorS={errorS}
        />
        {/* 성별 선택 */}
        <GenderSelect gender={gender} setGender={setGender} />
        {/* 연령대 선택 */}
        <GenerationSelect
          generation={generation}
          setGeneration={setGeneration}
        />
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
