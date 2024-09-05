'use client';

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { usernameV, emailV, passwordV, passwordConfirmV } from '../validationRules';
import { SignupForm } from "../../../types/signupForm";
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from "next/navigation";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>();
  const router = useRouter();

  const onSubmit = (formData:SignupForm) => {
    Swal.fire({
      title: '회원가입 성공',
      text: '가입해주신 이메일로 로그인해주세요.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
    });
    router.push('/login');
  };

  const errorS = 'text-sm text-red-500';
  return (
    <div className="mt-3">
      <form className="flex flex-col max-w-[500px] mx-auto gap-3 border p-3 rounded-md"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-end">
          <Input type="email" label="이메일" variant="underlined" required
            {...register('email', emailV)} />
          <Button color="primary" isDisabled>코드전송</Button>
        </div>
        <ErrorMessage errors={errors} name="email"
        render={({ message }) => <p className={errorS}>{message}</p>} />
        <div className="flex items-end">
          <Input type="number" label="이메일 인증" variant="underlined" required
            {...register('emailConfirm')} />
          <Button color="primary" isDisabled>인증</Button>
        </div>
        <div className="flex items-end">
          <Input type="text" label="유저이름" variant="underlined" required
            {...register('userName', usernameV)} />
          <Button color="primary" isDisabled>중복확인</Button>
        </div>
        <ErrorMessage errors={errors} name="userName"
        render={({ message }) => <p className={errorS}>{message}</p>} />
        <Input type="password" label="비밀번호" variant="underlined" required
          {...register('password', passwordV)} />
        <ErrorMessage errors={errors} name="password"
          render={({ message }) => <p className={errorS}>{message}</p>} />
        <Input type="password" label="비밀번호 확인" variant="underlined" required
          {...register('passwordConfirm', passwordConfirmV)} />
        <ErrorMessage errors={errors} name="passwordConfirm"
          render={({ message }) => <p className={errorS}>{message}</p>} />
        <div className="flex justify-end">
          <Button type="submit">회원가입</Button>
        </div>
      </form>
    </div>
  )
};

export default Signup;