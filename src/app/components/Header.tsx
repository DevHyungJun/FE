'use client';

import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useState } from "react";
import { AcmeLogo } from "../../../public/AcmeLogo";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const isAdminOpen = pathname.startsWith("/admin");
  const isProductOpen = pathname.startsWith("/products");
  const isLoginOpen = pathname.startsWith("/login");
  const isSignupOpen = pathname.startsWith("/signup");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navbarItems = [
    { label: "제품", href: "/products", isActive: isProductOpen },
    { label: "장바구니", href: "#" },
    { label: "마이페이지", href: "#" },
    { label: "관리자", href: "/admin", isActive: isAdminOpen },
  ];

  const menuItems = [
    { label: "제품", href: "/products", isOpen: isProductOpen },
    { label: "장바구니", href: "#" },
    { label: "마이페이지", href: "#" },
    { label: "관리자", href: "/admin", isOpen: isAdminOpen },
    { label: "로그인", href: "/login", isOpen: isLoginOpen },
    { label: "회원가입", href: "/signup", isOpen: isSignupOpen },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={`${isMenuOpen ? "bg-gray-50" : ""}text-gray-800`}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href="/" className="flex items-center">
            <AcmeLogo />
            <p className="font-bold text-inherit">SHOP</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Link href={'/'} className="flex items-center">
            <AcmeLogo />
            <p className="font-bold text-inherit">SHOP</p>
          </Link>
        </NavbarBrand>
        {navbarItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`} isActive={item.isActive} className="hover:text-blue-500">
            <Link href={item.href}>{item.label}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button as={Link} color="default" href="/login" variant="flat"
          className="hidden sm:flex">
            로그인
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="/signup" variant="flat" className="hidden sm:flex">
            회원가입
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-gray-50">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className="hover:text-blue-500"
          isActive={item.isOpen}>
            <Link
              className="w-full"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
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