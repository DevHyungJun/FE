'use client';

import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useState } from "react";
import { AcmeLogo } from "../../../public/AcmeLogo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/hooks/useAuthCheck";
import useLogout from "@/hooks/useLogout";

const Header = () => {
  const router = useRouter();

  // 현재 경로 확인
  const pathname = usePathname();
  const isAdminOpen = pathname.startsWith("/admin");
  const isProductOpen = pathname.startsWith("/products");
  const isLoginOpen = pathname.startsWith("/login");
  const isSignupOpen = pathname.startsWith("/signup");

  // 메뉴 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 인증 상태 확인
  const { data: authCheckData, isSuccess: authCheckIsSuccess } = useAuthCheck();
  // 로그아웃
  const { mutate: logout, isPending: logoutIsPending } = useLogout();

  // 데스크탑 메뉴 항목
  const navbarItems = [
    { label: "제품", href: "/products", isActive: isProductOpen },
    { label: "장바구니", href: "#" },
    { label: "관리자", href: "/admin", isActive: isAdminOpen },
  ];

  // 로그인 라우팅 혹은 로그아웃 처리
  const handleLoginLogout = () => {
    if (!authCheckIsSuccess || authCheckData?.isLoggedIn === false) {
      router.push('/login');
      return;
    }
    logout();
  };
  // 회원가입 라우팅 혹은 마이페이지 라우팅
  const handleSignupMypage = () => {
    if (!authCheckIsSuccess || authCheckData?.isLoggedIn === false) {
      router.push('/signup');
      return;
    }
    router.push('/mypage');
  };

  // 모바일 메뉴 항목
  const menuItems = [
    { label: "제품", href: "/products", isOpen: isProductOpen },
    { label: "장바구니", href: "#" },
    { label: "관리자", href: "/admin", isOpen: isAdminOpen },
    {
      label: !authCheckIsSuccess || authCheckData?.isLoggedIn === false ? '로그인' : '로그아웃',
      href: !authCheckIsSuccess || authCheckData?.isLoggedIn === false ? "/login" : "#",
      isOpen: isLoginOpen,
      onclick: handleLoginLogout
    },
    {
      label: !authCheckIsSuccess || authCheckData?.isLoggedIn === false ? '회원가입' : '마이페이지',
      href: !authCheckIsSuccess || authCheckData?.isLoggedIn === false ? "/signup" : "#",
      isOpen: isSignupOpen,
      onclick: handleSignupMypage
    },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={`${isMenuOpen ? "bg-gray-50" : ""}text-gray-800`}
    >
      <NavbarContent
        className="sm:hidden" justify="start"
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent
        className="sm:hidden pr-3"
        justify="center"
      >
        <NavbarBrand>
          <Link
            href="/"
            className="flex items-center"
          >
            <AcmeLogo />
            <p className="font-bold text-inherit">
              SHOP
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      >
        <NavbarBrand>
          <Link
            href={'/'}
            className="flex items-center"
          >
            <AcmeLogo />
            <p className="font-bold text-inherit">
              SHOP
            </p>
          </Link>
        </NavbarBrand>
        {navbarItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={item.isActive}
            className="hover:text-blue-500"
          >
            <Link href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem
          className={`hidden sm:flex cursor-pointer hover:text-blue-500 ${isLoginOpen && 'font-semibold'}`}
          onClick={handleLoginLogout}
        >
          {!authCheckIsSuccess || authCheckData?.isLoggedIn === false ? '로그인' : '로그아웃'}
        </NavbarItem>
        <NavbarItem
          className={`hidden sm:flex cursor-pointer hover:text-blue-500 ${isSignupOpen && 'font-semibold'}`}
          onClick={handleSignupMypage}
        >
          {!authCheckIsSuccess || authCheckData?.isLoggedIn === false ? '회원가입' : '마이페이지'}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-gray-50">
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            className="hover:text-blue-500"
            isActive={item.isOpen}
          >
            <Link
              className="w-full"
              href={item.href}
              onClick={() => {
                if (item.onclick) {
                  item.onclick();
                  setIsMenuOpen(false);
                }
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;