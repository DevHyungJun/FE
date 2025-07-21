"use client";

import Rate from "@/app/components/Rate";
import Image from "next/image";
import formatDateToYMD from "@/util/formatDateToYMD";

interface ReviewHeaderProps {
  author: string;
  updatedAt: string;
  rate: number;
}

export default function ReviewHeader({
  author,
  updatedAt,
  rate,
}: ReviewHeaderProps) {
  return (
    <div className="flex gap-3 items-center">
      <Image
        src="/basic_profile.png"
        alt="Profile Image"
        width={30}
        height={30}
      />
      <div className="text-sm space-y-1">
        <div className="flex items-center gap-2">
          <p className="bold">{author}</p>
          <p className="text-gray-400 text-xs light">
            {formatDateToYMD(updatedAt)}
          </p>
        </div>
        <div className="flex items-center">
          <Rate value={rate} disabled size={12} />
          <span className="ml-1 text-[14px]">{rate}</span>
        </div>
      </div>
    </div>
  );
}
