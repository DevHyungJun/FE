"use client";

import Link from "next/link";
import { AcmeLogo } from "../../../public/AcmeLogo";
import useAuthCheck from "@/hooks/useAuthCheck";

const Footer = () => {
  const { isSuccess } = useAuthCheck();
  const footerObj = [
    {
      title: "새로운 아이템의 발견",
      desc: "트렌디한 상품부터 인기 아이템까지, 다양한 카테고리에서 당신만의 스타일을 찾아보세요.",
    },
    {
      title: "나만의 쇼핑몰",
      desc: "회원가입을 통해 나만의 찜 목록을 만들고, 맞춤 추천과 특별 혜택을 받아보세요.",
    },
    {
      title: "당신만을 위한",
      desc: "멤버십에 가입하면 무료배송, 전용 할인, 얼리엑세스 등 다양한 혜택을 누릴 수 있어요.",
    },
  ];

  return (
    <footer className="bg-[#252525] text-[#D6D5D6] px-4 py-8">
      <div className="hidden sm:flex max-w-[1200px] mx-auto flex-col gap-6 md:flex-row md:justify-between">
        {footerObj.map((item, index) => (
          <div key={index} className="md:w-[30%]">
            <h2 className="font-bold mb-2">{item.title}</h2>
            <p className="text-[#858585] text-sm font-light line-clamp-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="hidden sm:block max-w-[1200px] mx-auto h-px bg-[#D6D5D6] my-6"></div>

      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Link href="/" className="flex items-center gap-1">
          <AcmeLogo />
          <p className="font-extrabold text-inherit">SHOP</p>
        </Link>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-[#858585] font-light">
          <Link href="/products" className="md:hover:text-[#D6D5D6]">
            제품
          </Link>
          {isSuccess && (
            <>
              <Link href="/cart" className="md:hover:text-[#D6D5D6]">
                장바구니
              </Link>
              <Link href="/mypage" className="md:hover:text-[#D6D5D6]">
                마이페이지
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:justify-between text-[#858585] text-sm mt-6">
        <p className="underline">anyshop@gmail.com</p>
        <p>Copyright © 2025 anyshop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
