"use client";

import { Image } from "@nextui-org/react";
import Link from "next/link";
import { TfiAngleRight } from "react-icons/tfi";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MyPage() {
  const { data, isLoading } = useGetUserInfo();
  const profileImage = data?.data?.profile_image;
  const links = [
    {
      href: "/",
      label: "주문내역 조회",
      subLabel: "주문한 상품을 조회합니다.",
    },
    {
      href: "mypage/edit-password",
      label: "비밀번호 변경",
      subLabel: "등록된 비밀번호를 변경합니다.",
    },
    {
      href: "/mypage/mp-address",
      label: "배송지 관리",
      subLabel: "등록된 배송지를 삭제/수정합니다.",
    },
    {
      href: `/mypage/mp-review`,
      label: "리뷰 관리",
      subLabel: "작성한 리뷰를 수정/삭제합니다.",
    },
    {
      href: "mypage/delete-account",
      label: "회원 탈퇴",
      subLabel:
        "쇼핑몰에 등록된 아이디 탈퇴, 탈퇴한 아이디로는 다시 접속하실 수 없습니다.",
    },
  ];
  return (
    <div className="max-w-[800px] mx-auto flex flex-col items-center gap-3 text-lg p-3 mt-5 text-gray-900">
      {isLoading ? (
        <LoadingSpinner mode="1" />
      ) : (
        <div className="flex justify-start w-full items-center gap-4 ml-5">
          <Image
            src={profileImage ? profileImage : "/basic_profile.png"}
            alt="Profile Image"
            width={50}
            height={50}
            radius="full"
          />
          <div className="space-y-1 text-gray-700">
            <p className="extra-bold">{data?.data?.email}</p>
            <p className="text-sm bold">
              <span className="text-gray-400 light">닉네임:</span>
              {data?.data?.username}
            </p>
          </div>
        </div>
      )}
      <div className="w-full flex gap-1 mt-2">
        <Link
          href="mypage/user-image"
          className="text-sm border p-2 w-full rounded-md hover:font-semibold"
        >
          <p className="text-center">프로필 이미지 변경</p>
        </Link>
        <Link
          className="text-sm border p-2 w-full rounded-md hover:font-semibold"
          href="mypage/edit-username"
        >
          <p className="text-center">닉네임 변경</p>
        </Link>
      </div>
      {links.map((link, index) => (
        <div key={index} className="hover:font-semibold border-b w-full p-2">
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
