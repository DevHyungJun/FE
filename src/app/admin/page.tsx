import Link from "next/link";
import { TfiAngleRight } from "react-icons/tfi";
import { VscTools } from "react-icons/vsc";

const Admin = () => {
  const links = [
    {
      href: "/admin/post-register",
      label: "게시글 등록",
      subLabel: "실제 상품 등록",
    },
    { href: "/admin/item-list", label: "상품 목록", subLabel: "상품 목록" },
    { href: "/admin/new-item", label: "상품 등록", subLabel: "새 상품 등록" },
    {
      href: "/admin/category",
      label: "카테고리 관리",
      subLabel: "카테고리 생성, 삭제",
    },
    { href: "/admin/item-order", label: "주문하기", subLabel: "상품 주문" },
  ];

  const LinkStyle = "hover:font-semibold border-b w-full py-2";
  return (
    <div className="mx-auto max-w-[800px]">
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
