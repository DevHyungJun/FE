'use client';

import { Image } from "@nextui-org/react";
import Link from "next/link";
import { TfiAngleRight } from "react-icons/tfi";
import useGetUserInfo from "@/hooks/useGetUserInfo";

export default function MyPage() {
  const { data } = useGetUserInfo();

  const links = [
    { href: '/', label: '이메일 변경', subLabel: '등록된 이메일 변경' },
    { href: '/', label: '비밀번호 변경', subLabel: '등록된 비밀번호 변경' },
    { href: '/', label: '배송지 관리', subLabel: '기존 배송지 삭제, 수정' },
    { href: '/', label: '환불 계좌 관리', subLabel: '환불 시 계좌 추가, 삭제, 수정' },
    { href: '/', label: '리뷰 관리', subLabel: '작성한 리뷰 확인, 수정, 삭제' },
    { href: '/', label: '주문 내역', subLabel: '주문 내역 확인' },
    { href: '/', label: '회원 탈퇴', subLabel: '회원 탈퇴' },
  ];

  const LinkStyle = 'hover:font-semibold border-b w-full p-2';
  return (
    <div className="max-w-[800px] mx-auto flex flex-col items-center gap-3 text-lg p-3 mt-5 text-gray-900">
      <div className="flex justify-start w-full items-center gap-4 ml-5">
        <Image src="/basic_profile.png" alt="Profile Image" width={50} height={50} />
        <div className="space-y-1 font-[550] text-gray-800">
          <p>{data?.data?.email}</p>
          <p className="text-sm">
            <span className="text-gray-400">
              닉네임:
            </span> 
            {data?.data?.username}
          </p>
        </div>
      </div>
      <div className="w-full flex gap-1 mt-2">
        <button className="text-sm border p-2 w-full rounded-md hover:font-semibold">프로필 이미지 변경</button>
        <button className="text-sm border p-2 w-full rounded-md hover:font-semibold">닉네임 변경</button>
      </div>
      {links.map((link, index) => (
        <div key={index} className={LinkStyle}>
          <Link href={link.href}>
            <div className="flex justify-between items-center">
              <p className="text-[16px]">{link.label}</p>
              <TfiAngleRight className="text-[16px] text-gray-400 mt-3" />
            </div>
            <p className="text-sm text-gray-400">{link.subLabel}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}