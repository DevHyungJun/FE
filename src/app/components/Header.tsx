'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isAdminOpen = pathname.startsWith("/admin");
  const isProductOpen = pathname.startsWith("/products");
  const isLoginOpen = pathname.startsWith("/login");
  const isSignupOpen = pathname.startsWith("/signup");
  const secondNavItemsStyle = "hidden flex-shrink-0 p-2 text-center sm:block  hover:bg-gray-100 rounded-md";

  return (
    <header className={`grid grid-cols-2 w-full px-1 py-3 ${isAdminOpen || isProductOpen || isLoginOpen || isSignupOpen ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} border`}>
      <div className={`flex gap-3 items-center ${isAdminOpen ? 'justify-between' : 'justify-normal'}`}>
        <Link href="/" className="p-1">
          로고
        </Link>
        <Link href='/company' className={`${isLoginOpen ? 'block' : 'hidden'}`}>회사소개</Link>
        <Link href="/products" className="hidden p-2 sm:block hover:bg-gray-100 rounded-md">
          {isAdminOpen || isLoginOpen ? '제품구매' : '제품'}
        </Link>
        <Link href='/service-center' className={`${isLoginOpen ? 'block' : 'hidden'}`}>고객센터</Link>
      </div>
      <div className={`flex justify-end gap-3 ${isAdminOpen || isProductOpen || isLoginOpen || isSignupOpen ? 'sm:justify-self-end' : 'sm:justify-self-center'}`}>
        <Link href="/cart" className={secondNavItemsStyle}>
          장바구니
        </Link>
        <Link href="/mypage" className={secondNavItemsStyle}>
          마이페이지
        </Link>
        <Link href="/login" className={secondNavItemsStyle}>
          로그인
        </Link>
        <Link href="/admin" className={secondNavItemsStyle}>
          관리자
        </Link>
        <Link className="p-1 sm:hidden" href="/menu">메뉴</Link>
      </div>
    </header>
  );
};

export default Header;