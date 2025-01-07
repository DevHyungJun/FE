"use client";

import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Badge,
  Image,
} from "@nextui-org/react";
import { useState } from "react";
import { AcmeLogo } from "../../../public/AcmeLogo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/hooks/useAuthCheck";
import useLogout from "@/hooks/useLogout";
import {
  CiLogout,
  CiLogin,
  CiShoppingCart,
  CiShoppingTag,
} from "react-icons/ci";
import { IoPersonOutline, IoPersonAddOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";
import useGetCart from "@/hooks/useGetCart";
import { useQueryClient } from "@tanstack/react-query";

interface CahcedUserLoggedIn {
  data: {
    isLoggedIn: boolean;
  };
}

const Header = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const cahcedUserLoggedIn = queryClient.getQueryData<CahcedUserLoggedIn>([
    "authCheck",
  ]);
  const loginState = cahcedUserLoggedIn?.data?.isLoggedIn;
  const {
    data: cartData,
    isSuccess: cartIsSuccess,
    isLoading,
  } = useGetCart(!!loginState);

  // 현재 경로 확인
  const pathname = usePathname();
  const isAdminOpen = pathname.startsWith("/admin");
  const isProductOpen = pathname.startsWith("/products");
  const isLoginOpen = pathname.startsWith("/login");
  const isSignupOpen = pathname.startsWith("/signup");
  const isCartOpen = pathname.startsWith("/cart");
  const isMypageOpen = pathname.startsWith("/mypage");

  // 메뉴 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 인증 상태 확인
  const { data: authCheckData, isSuccess: authCheckIsSuccess } = useAuthCheck();
  // 로그아웃
  const { mutate: logout } = useLogout();

  const isAdmin = authCheckData?.data?.role === "admin";
  const isLoggedIn = authCheckData?.data?.isLoggedIn;

  // 데스크탑 메뉴 항목
  const navbarItems = [
    {
      label: "제품",
      href: "/products",
      isActive: isProductOpen,
      icon: <CiShoppingTag className="text-xl" />,
    },
    {
      label: "장바구니",
      href: "/cart",
      icon: cartData?.article_list.length ? (
        <Badge
          content={cartData?.article_list.length}
          size="sm"
          color="primary"
        >
          <CiShoppingCart className="text-xl" />
        </Badge>
      ) : (
        <CiShoppingCart className="text-xl" />
      ),
      isActive: isCartOpen,
    },
    {
      label: "관리자",
      href: "/admin",
      isActive: isAdminOpen,
      icon: <VscTools className="text-lg" />,
    },
  ];

  // 로그인 라우팅 혹은 로그아웃 처리
  const handleLoginLogout = () => {
    if (!authCheckIsSuccess || authCheckData?.isLoggedIn === false) {
      router.push("/login");
      return;
    }
    logout();
  };

  // 회원가입 라우팅 혹은 마이페이지 라우팅
  const handleSignupMypage = () => {
    if (!authCheckIsSuccess || authCheckData?.isLoggedIn === false) {
      router.push("/signup");
      return;
    }
    router.push("/mypage");
  };

  // 모바일 메뉴 항목
  const menuItems = [
    {
      label: "제품",
      href: "/products",
      isOpen: isProductOpen,
      icon: <CiShoppingTag className="text-xl" />,
    },
    {
      label: "장바구니",
      href: "/cart",
      icon: cartData?.article_list.length ? (
        <Badge
          content={cartData?.article_list.length}
          size="sm"
          color="primary"
        >
          <CiShoppingCart className="text-xl" />
        </Badge>
      ) : (
        <CiShoppingCart className="text-xl" />
      ),
      isOpen: isCartOpen,
    },
    {
      label: "관리자",
      href: "/admin",
      isOpen: isAdminOpen,
      icon: <VscTools className="text-lg" />,
    },
    {
      label:
        !authCheckIsSuccess || authCheckData?.isLoggedIn === false
          ? "회원가입"
          : "마이페이지",
      href:
        !authCheckIsSuccess || authCheckData?.isLoggedIn === false
          ? "/signup"
          : "/mypage",
      isOpen: isSignupOpen || isMypageOpen,
      onclick: handleSignupMypage,
      icon:
        !authCheckIsSuccess || authCheckData?.isLoggedIn === false ? (
          <IoPersonAddOutline className="text-lg" />
        ) : (
          <Image
            src="/basic_profile.png"
            alt="Profile Image"
            width={20}
            height={20}
          />
        ),
    },
    {
      label:
        !authCheckIsSuccess || authCheckData?.isLoggedIn === false
          ? "로그인"
          : "로그아웃",
      href:
        !authCheckIsSuccess || authCheckData?.isLoggedIn === false
          ? "/login"
          : "#",
      isOpen: isLoginOpen,
      onclick: handleLoginLogout,
      icon:
        !authCheckIsSuccess || authCheckData?.isLoggedIn === false ? (
          <CiLogin className="text-lg" />
        ) : (
          <CiLogout className="text-lg" />
        ),
    },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={`${isMenuOpen ? "bg-gray-50" : ""}text-gray-800`}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/" className="flex items-center">
            <AcmeLogo />
            <p className="extra-bold text-inherit">SHOP</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href={"/"} className="flex items-center">
            <AcmeLogo />
            <p className="extra-bold text-inherit">SHOP</p>
          </Link>
        </NavbarBrand>
        {navbarItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={item.isActive}
            className={`hover:text-blue-500 text-sm ${
              item.label === "관리자" && !isAdmin ? "hidden" : ""
            } ${item.label === "장바구니" && !isLoggedIn ? "hidden" : ""}`}
          >
            <Link href={item.href}>
              {item.icon ? (
                <div className="flex items-center gap-1">
                  {item.icon}
                  {item.label}
                </div>
              ) : (
                item.label
              )}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem
          className={`hidden sm:flex cursor-pointer text-sm hover:text-blue-500 ${
            isLoginOpen && "bold"
          }`}
          onClick={handleLoginLogout}
        >
          {!authCheckIsSuccess || authCheckData?.isLoggedIn === false ? (
            <div className="flex items-center gap-1">
              <CiLogin className="text-lg" />
              로그인
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <CiLogout className="text-lg" />
              로그아웃
            </div>
          )}
        </NavbarItem>
        <NavbarItem
          className={`hidden sm:flex cursor-pointer text-sm hover:text-blue-500 ${
            isSignupOpen || isMypageOpen ? "bold" : ""
          }`}
          onClick={handleSignupMypage}
        >
          {!authCheckIsSuccess || authCheckData?.isLoggedIn === false ? (
            <div className="flex items-center gap-1">
              <IoPersonAddOutline className="text-lg" />
              회원가입
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Image
                src="/basic_profile.png"
                alt="Profile Image"
                width={20}
                height={20}
              />
              마이페이지
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-gray-50 flex gap-3">
        <div className="mt-1" />
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            className={`hover:text-blue-500 ${
              item.label === "관리자" && !isAdmin ? "hidden" : ""
            }${item.label === "장바구니" && !isLoggedIn ? "hidden" : ""}`}
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
              {item.icon ? (
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </div>
              ) : (
                item.label
              )}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
