'use client';

import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Login = () => {
  return (
    <div>
      <form className="flex flex-col max-w-[500px] mx-auto gap-3 border p-3 rounded-md">
        <Input type="email" label="이메일을 입력해주세요" variant="underlined" />
        <Input type="password" label="비밀번호를 입력해주세요" variant="underlined" />
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>아이디가 없으신가요?</p>
            <Link href='/signup' className="ml-1 hover:text-blue-500">
              회원가입
            </Link>
          </div>
          <Button>로그인</Button>
        </div>
      </form>
    </div>
  )
};

export default Login;
