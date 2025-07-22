import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import useAuthCheck from "@/hooks/useAuthCheck";
import useLogout from "@/hooks/useLogout";
import useGetCart from "@/hooks/useGetCart";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { chatUIState } from "@/store";
import Swal from "sweetalert2";

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
  onclick?: () => void;
}

export default function useHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, isSuccess } = useGetUserInfo();
  const profileImage = data?.data?.profile_image;
  const { data: cartData } = useGetCart(!!isSuccess);
  const { data: authCheckData, isSuccess: authCheckIsSuccess } = useAuthCheck();
  const { mutate: logout } = useLogout();
  const { chatUI } = chatUIState();
  useEffect(() => {
    if (authCheckData) {
      alert("authCheck성공");
    } else {
      alert("authCheck실패");
    }
  }, [authCheckData]);

  // 경로 확인
  const isAdminOpen = pathname.startsWith("/admin");
  const isProductOpen = pathname.startsWith("/products");
  const isLoginOpen = pathname.startsWith("/login");
  const isSignupOpen = pathname.startsWith("/signup");
  const isCartOpen = pathname.startsWith("/cart");
  const isMypageOpen = pathname.startsWith("/mypage");

  // 권한 확인
  const isAdmin = authCheckIsSuccess && authCheckData?.data?.role === "admin";
  const isLoggedIn = authCheckIsSuccess && authCheckData?.data?.isLoggedIn;

  useEffect(() => {
    if (isLoggedIn) {
      alert("isLoggedIn성공");
    } else {
      alert("isLoggedIn실패");
    }
  }, [isLoggedIn]);
  // 핸들러 함수들
  const handleLoginLogout = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    logout();
  };

  const handleSignupMypage = () => {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }
    router.push("/mypage");
  };

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
      label: !Boolean(isLoggedIn) ? "회원가입" : "마이페이지",
      href: !Boolean(isLoggedIn) ? "/signup" : "/mypage",
      isOpen: isSignupOpen || isMypageOpen,
      onclick: handleSignupMypage,
      iconType: !isLoggedIn ? "person-add" : "profile",
    },
    {
      label: !Boolean(isLoggedIn) ? "로그인" : "로그아웃",
      href: !Boolean(isLoggedIn) ? "/login" : "#",
      isOpen: isLoginOpen,
      onclick: handleLoginLogout,
      iconType: !Boolean(isLoggedIn) ? "login" : "logout",
    },
  ];

  return {
    // 상태
    isMenuOpen,
    setIsMenuOpen,
    chatUI,

    // 데이터
    profileImage,
    authCheckIsSuccess,
    authCheckData,

    // 경로 상태
    isLoginOpen,
    isSignupOpen,
    isMypageOpen,

    // 권한
    isAdmin,
    isLoggedIn,

    // 메뉴 항목
    navbarItems,
    menuItems,

    // 핸들러
    handleLoginLogout,
    handleSignupMypage,
  };
}
