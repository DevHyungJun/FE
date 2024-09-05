'use client';

import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { passwordV, emailV } from "../validationRules";
import { ErrorMessage } from '@hookform/error-message';
import { LoginForm } from "../../../types/loginForm";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const router = useRouter();

  const onSubmit = (formData: LoginForm) => {
    Swal.fire({
      title: '로그인 성공',
      text: '로그인이 완료되었습니다.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
    });
    router.push('/');
  };
  
  const errorS = 'text-sm text-red-500';
  return (
    <div className="mt-3 text-gray-800">
      <form className="flex flex-col max-w-[500px] mx-auto gap-3 border p-3 rounded-md"
        onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" label="이메일을 입력해주세요" variant="underlined"
          {...register('email', emailV)} />
        <ErrorMessage errors={errors} name="email"
          render={({ message }) => <p className={errorS}>{message}</p>} />
        <Input type="password" label="비밀번호를 입력해주세요" variant="underlined"
          {...register('password', passwordV)} />
        <ErrorMessage errors={errors} name="password"
          render={({ message }) => <p className={errorS}>{message}</p>} />
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>계정이 없으신가요?</p>
            <Link href='/signup' className="ml-1 font-semibold hover:text-blue-500">
              회원가입
            </Link>
          </div>
          <Button type="submit">로그인</Button>
        </div>
      </form>
    </div>
  )
};

export default Login;
