'use client';

import { Button, Input } from "@nextui-org/react";

const Signup = () => {
  return (
    <div>
      <form className="flex flex-col max-w-[500px] mx-auto gap-3 border p-3 rounded-md">
        <Input type="email" label="이메일" variant="underlined" />
        <Input type="text" label="이메일 인증" variant="underlined" />
        <Input type="password" label="비밀번호" variant="underlined" />
        <Input type="password" label="비밀번호 확인" variant="underlined" />
        <div className="flex justify-end">
          <Button isDisabled>회원가입</Button>
        </div>
      </form>
    </div>
  )
};

export default Signup;