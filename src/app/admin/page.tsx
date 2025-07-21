"use client";

import Link from "next/link";
import { TfiAngleRight } from "react-icons/tfi";
import { VscTools } from "react-icons/vsc";
import useGuestOut from "@/hooks/useGuestOut";
import { links } from "@/constants/admin";

const Admin = () => {
  useGuestOut(true);

  const LinkStyle = "hover:font-semibold border-b w-full py-2";
  return (
    <div className="mx-auto max-w-[800px] px-2">
      <h1 className="flex items-center gap-2 text-2xl extra-bold my-5">
        <VscTools />
        관리자 페이지
      </h1>
      <div className="flex flex-col items-center gap-3 text-lg text-gray-900">
        {links.map((link, index) => (
          <div key={index} className={LinkStyle}>
            <Link href={link.href}>
              <div className="flex justify-between items-center">
                <p className="text-[16px]">{link.label}</p>
                <TfiAngleRight className="text-[16px] text-gray-400 mt-3" />
              </div>
              <p className="text-sm text-gray-400 light">{link.subLabel}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
