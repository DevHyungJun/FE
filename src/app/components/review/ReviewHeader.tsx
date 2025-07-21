"use client";

import Image from "next/image";
import { Rate } from "antd";
import formatDate from "@/util/formatDate";

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
          <p className="text-gray-400 text-xs light">{formatDate(updatedAt)}</p>
        </div>
        <Rate
          value={rate}
          disabled
          style={{
            fontSize: "12px",
          }}
        />
        <span className="ml-1 text-[14px]">{rate}</span>
      </div>
    </div>
  );
}
