"use client";

import Link from "next/link";
import useAuthCheck from "@/hooks/useAuthCheck";

const FooterUserLink = () => {
  const { isSuccess } = useAuthCheck();
  return (
    <>
      {isSuccess && (
        <div className="space-x-3">
          <Link href="/cart" className="md:hover:text-[#D6D5D6]">
            장바구니
          </Link>
          <Link href="/mypage" className="md:hover:text-[#D6D5D6]">
            마이페이지
          </Link>
        </div>
      )}
    </>
  );
};

export default FooterUserLink;
