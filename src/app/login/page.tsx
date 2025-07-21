"use client";

import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { passwordV, emailV } from "../validationRules";
import { ErrorMessage } from "@hookform/error-message";
import { LoginForm } from "../../../types/loginForm";
import useLogin from "@/hooks/useLogin";
import { CiLogin } from "react-icons/ci";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // 로그인 요청
  const login = useLogin();

  // 로그인 폼 제출
  const onSubmit = (formData: LoginForm) => login.mutate(formData);

  const errorS = "text-sm text-red-500";
  return (
    <div className="min-h-[calc(100vh-333px)] sm:min-h-[calc(100vh-502px)] md:min-h-[calc(100vh-330px)] flex items-center justify-center text-gray-800">
      <form
        className="flex flex-col w-[500px] mx-auto gap-3 shadow-none p-3 rounded-md sm:shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-2 text-2xl extra-bold m-1">
          <CiLogin />
          로그인
        </div>
        <Input
          type="email"
          label="이메일을 입력해주세요"
          variant="underlined"
          required
          isClearable
          {...register("email", emailV)}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p className={errorS}>{message}</p>}
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          variant="underlined"
          isClearable
          className="font-sans"
          {...register("password", passwordV)}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p className={errorS}>{message}</p>}
        />
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>계정이 없으신가요?</p>
            <Link
              href="/signup"
              className="ml-1 extra-bold hover:text-blue-500"
            >
              회원가입
            </Link>
          </div>
          <Button
            type="submit"
            color="primary"
            isLoading={login.isPending}
            className="bold"
          >
            로그인
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
