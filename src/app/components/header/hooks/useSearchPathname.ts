import { usePathname } from "next/navigation";

const useSearchPathname = () => {
  const pathname = usePathname();

  const isAdminOpen = pathname.startsWith("/admin");
  const isProductOpen = pathname.startsWith("/products");
  const isLoginOpen = pathname.startsWith("/login");
  const isSignupOpen = pathname.startsWith("/signup");
  const isCartOpen = pathname.startsWith("/cart");
  const isMypageOpen = pathname.startsWith("/mypage");

  return {
    isAdminOpen,
    isProductOpen,
    isLoginOpen,
    isSignupOpen,
    isCartOpen,
    isMypageOpen,
  };
};

export default useSearchPathname;
