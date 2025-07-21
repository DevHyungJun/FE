"use client";

import { Image } from "@nextui-org/react";
import Link from "next/link";
import { TfiAngleRight } from "react-icons/tfi";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import LoadingSpinner from "../components/LoadingSpinner";
import useGuestOut from "@/hooks/useGuestOut";
import { links } from "@/constants/mypage";

export default function MyPage() {
  const { data, isLoading } = useGetUserInfo();
  useGuestOut();
  const profileImage = data?.data?.profile_image;

  return (
    <div className="max-w-[800px] mx-auto flex flex-col items-center gap-3 text-lg p-3 text-gray-900">
      {isLoading ? (
        <LoadingSpinner mode="1" />
      ) : (
        <div className="flex justify-start w-full items-center gap-2 ml-5">
          <Image
            src={profileImage ? profileImage : "/basic_profile.png"}
            alt="Profile Image"
            width={50}
            height={50}
            radius="full"
            className="object-cover"
          />
          <div className="space-y-1 text-gray-700">
            <p className="extra-bold">{data?.data?.username}</p>
            <p className="text-sm bold">{data?.data?.email}</p>
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
