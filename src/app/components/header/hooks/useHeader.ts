import { useState } from "react";
import useGetCart from "@/hooks/useGetCart";
import useLoginLogout from "./useLoginLogout";
import useSignupMypage from "./useSignupMypage";
import useIsLoggedIn from "./useIsLoggedIn";
import useSearchPathname from "./useSearchPathname";

interface NavbarItem {
  label: string;
  href: string;
  isActive: boolean;
  iconType: string;
  badgeCount?: number;
}

interface MenuItem {
  label: string;
  href: string;
  isOpen: boolean;
  iconType: string;
  badgeCount?: number;
  onclick?: (isLoggedIn: boolean) => void;
}

export default function useHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useIsLoggedIn();
  const { data: cartData } = useGetCart(!!isLoggedIn);
  const { handleLoginLogout } = useLoginLogout();
  const { handleSignupMypage } = useSignupMypage();
  const {
    isAdminOpen,
    isCartOpen,
    isLoginOpen,
    isMypageOpen,
    isProductOpen,
    isSignupOpen,
  } = useSearchPathname();

  // 데스크탑 메뉴 항목
  const navbarItems: NavbarItem[] = [
    {
      label: "제품",
      href: "/products",
      isActive: isProductOpen,
      iconType: "shopping-tag",
    },
    {
      label: "장바구니",
      href: "/cart",
      iconType: "shopping-cart",
      badgeCount: cartData?.article_list.length,
      isActive: isCartOpen,
    },
    {
      label: "관리자",
      href: "/admin",
      isActive: isAdminOpen,
      iconType: "tools",
    },
  ];

  // 모바일 메뉴 항목
  const menuItems: MenuItem[] = [
    {
      label: "제품",
      href: "/products",
      isOpen: isProductOpen,
      iconType: "shopping-tag",
    },
    {
      label: "장바구니",
      href: "/cart",
      iconType: "shopping-cart",
      badgeCount: cartData?.article_list.length,
      isOpen: isCartOpen,
    },
    {
      label: "관리자",
      href: "/admin",
      isOpen: isAdminOpen,
      iconType: "tools",
    },
    {
      label: !isLoggedIn ? "회원가입" : "마이페이지",
      href: !isLoggedIn ? "/signup" : "/mypage",
      isOpen: isSignupOpen || isMypageOpen,
      onclick: () => handleSignupMypage(isLoggedIn),
      iconType: !isLoggedIn ? "person-add" : "profile",
    },
    {
      label: !isLoggedIn ? "로그인" : "로그아웃",
      href: !isLoggedIn ? "/login" : "#",
      isOpen: isLoginOpen,
      onclick: () => handleLoginLogout(isLoggedIn),
      iconType: !isLoggedIn ? "login" : "logout",
    },
  ];

  return {
    isMenuOpen,
    setIsMenuOpen,
    navbarItems,
    menuItems,
  };
}
