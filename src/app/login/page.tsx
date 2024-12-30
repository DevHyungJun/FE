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
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Login = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // 로그인 요청
  const login = useLogin();

  // 로그인 폼 제출
  const onSubmit = (formData: LoginForm) =>
    login.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authCheck"] });
        queryClient.invalidateQueries({ queryKey: ["getCart"] });
        router.push("/");
      },
      onError: (error) => {
        Swal.fire({
          title: "로그인 실패",
          text: "이메일 또는 비밀번호가 일치하지 않습니다.",
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
      },
    });

  const errorS = "text-sm text-red-500";
  return (
    <div className="flex items-center justify-center h-[60vh] text-gray-800">
      <form
        className="flex flex-col w-[500px] mx-auto gap-3 border p-3 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center gap-2 text-2xl font-semibold m-1">
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
          label="비밀번호를 입력해주세요"
          variant="underlined"
          isClearable
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
              className="ml-1 font-semibold hover:text-blue-500"
            >
              회원가입
            </Link>
          </div>
          <Button type="submit" color="primary" isLoading={login.isPending}>
            로그인
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
