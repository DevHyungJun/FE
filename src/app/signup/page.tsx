'use client';

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { usernameV, emailV, emailConfirmV,passwordV, passwordConfirmV } from '../validationRules';
import { SignupForm } from "../../../types/signupForm";
import { ErrorMessage } from '@hookform/error-message';
import useSendMail from "@/hooks/useSendMail";
import useConfirmMail from "@/hooks/useConfirmMail";
import useUsernameCheck from "@/hooks/useUsernameCheck";
import useSignup from "@/hooks/useSignup";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, getValues, trigger } = useForm<SignupForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [countdown, setCountdown] = useState<number | null>(null);
  const [expriedMessage, setExpriedMessage] = useState(false);

  // 커스텀 훅 사용
  const sendMail = useSendMail();
  const confirmMail = useConfirmMail();
  const usernameCheck = useUsernameCheck();
  const signup = useSignup();

  const formatTime = useCallback((second: number | null) => {
    if(second === null) return;
    const min = Math.floor(second / 60);
    const sec = second % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }, []);

  useEffect(()=> {
    let timer: NodeJS.Timeout;
    if(countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev)=> prev! - 1), 1000);
    } else if(countdown === 0) {
      setCountdown(null);
      setExpriedMessage(true);
    };

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendMail = async() => { // 이메일 전송
    const isValid = await trigger('email');
    if(isValid) {
      const emailValue = getValues('email');
      sendMail.mutate(emailValue, {
        onSuccess: () => {
          setCountdown(300);
          setExpriedMessage(false);
        }
      });
    };
  };

  const handleMailConfirm = async() => { // 이메일 인증
    const isValid = await trigger('emailConfirm');
    if(isValid) {
      const email = getValues('email');
      const emailCode = getValues('emailConfirm').trim();
      confirmMail.mutate({email, emailCode}, {
        onSuccess: () => {
          setCountdown(null);
          setExpriedMessage(false);
        }
      });
    };
  };

  const handleUsernameCheck = async() => { // 유저이름 중복확인
    const isValid = await trigger('username');
    if(isValid) {
      const userName = getValues('username');
      usernameCheck.mutate(userName);
    };
  };

  const onSubmit = (formData:SignupForm) => { // 회원가입
    if(!confirmMail.isSuccess || !usernameCheck.isSuccess) {
      Swal.fire({
        icon: 'error',
        title: '회원가입 실패',
        text: '이메일 인증과 유저이름 중복확인을 완료해주세요.',
      });
      return;
    };
    const {email, password, username} = formData;
    signup.mutate({email, password, username});
  };

  const formInDiv = 'flex items-end gap-1';
  const errorS = 'text-sm text-red-500';
  return (
    <div className="mt-3">
      <form className="flex flex-col max-w-[500px] mx-auto gap-3 border p-3 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 이메일 입력&전송&에러메세지 */}
        <div className={formInDiv}>
          <Input 
            type="email" 
            label="이메일" 
            variant="underlined" 
            required
            {...register('email', emailV)}
            isDisabled={confirmMail.isSuccess}
          />
          <Button 
            color="primary" 
            onClick={handleSendMail} 
            isLoading={sendMail.isPending}
            isDisabled={confirmMail.isSuccess}
          >
            전송
          </Button>
        </div>
        <ErrorMessage 
          errors={errors} 
          name="email"
          render={({ message }) => <p className={errorS}>{message}</p>}
        />
        {/* 이메일 인증입력&확인&에러메세지 */}
        <div className={formInDiv}>
          <Input 
            type="text" 
            label="이메일 인증" 
            variant="underlined" 
            required
            {...register('emailConfirm', emailConfirmV)} 
            isDisabled={confirmMail.isSuccess}
          />
          <p className="text-sm text-yellow-500 m-1">{formatTime(countdown)}</p>
          <Button 
            color="primary" 
            onClick={handleMailConfirm}
            isLoading={confirmMail.isPending}
            isDisabled={confirmMail.isSuccess}
          >
            인증
          </Button>
        </div>
        {expriedMessage && (
          <p className="text-sm text-red-500">
            인증시간이 만료되었습니다. 다시 인증해주세요.
          </p>
        )}
        <ErrorMessage 
          errors={errors} 
          name="emailConfirm"
          render={({ message }) => <p className={errorS}>{message}</p>}
        />
        {/* 유저이름 입력&중복확인&에러메세지 */}
        <div className={formInDiv}>
          <Input 
            type="text" 
            label="유저이름" 
            variant="underlined" 
            required
            {...register('username', usernameV)}  
          />
          <Button 
            color="primary" 
            isLoading={usernameCheck.isPending}
            onClick={handleUsernameCheck}
          >
            중복확인
          </Button>
        </div>
        <ErrorMessage 
          errors={errors} 
          name="username"
          render={({ message }) => <p className={errorS}>{message}</p>}
        />
        {/* 비밀번호 입력&에러메세지 */}
        <Input 
          type="password" 
          label="비밀번호" 
          variant="underlined" 
          required
          {...register('password', passwordV)} 
        />
        <ErrorMessage 
          errors={errors} 
          name="password"
          render={({ message }) => <p className={errorS}>{message}</p>}
        />
        {/* 비밀번호 확인 입력&에러메세지 */}
        <Input 
          type="password" 
          label="비밀번호 확인" 
          variant="underlined" 
          required
          {...register('passwordConfirm', passwordConfirmV)} 
        />
        <ErrorMessage 
          errors={errors} 
          name="passwordConfirm"
          render={({ message }) => <p className={errorS}>{message}</p>} 
        />
        {/* 회원가입 버튼 */}
        <div className="flex justify-end">
          <Button 
            type="submit"
            variant="bordered"
            isLoading={signup.isPending}
          >
            회원가입
          </Button>
        </div>
      </form>
    </div>
  )
};

export default Signup;