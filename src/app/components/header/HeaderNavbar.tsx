import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarItem,
  Badge,
} from "@nextui-org/react";
import { AcmeLogo } from "../../../../public/AcmeLogo";
import Link from "next/link";
import {
  CiLogout,
  CiLogin,
  CiShoppingCart,
  CiShoppingTag,
} from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";

interface HeaderNavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  navbarItems: Array<{
    label: string;
    href: string;
    isActive: boolean;
    iconType: string;
    badgeCount?: number;
  }>;
  isAdmin: boolean;
  isLoggedIn: boolean;
}

const getIconComponent = (iconType: string, className: string = "text-xl") => {
  switch (iconType) {
    case "shopping-tag":
      return <CiShoppingTag className={className} />;
    case "shopping-cart":
      return <CiShoppingCart className={className} />;
    case "tools":
      return <VscTools className={className} />;
    case "login":
      return <CiLogin className={className} />;
    case "logout":
      return <CiLogout className={className} />;
    case "person-add":
      return <IoPersonAddOutline className={className} />;
    default:
      return null;
  }
};

export default function HeaderNavbar({
  isMenuOpen,
  setIsMenuOpen,
  navbarItems,
  isAdmin,
  isLoggedIn,
}: HeaderNavbarProps) {
  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={`${isMenuOpen && "bg-gray-50"}text-gray-800`}
    >
      <NavbarContent className="sm:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarContent className="sm:hidden pr-20">
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
              item.label === "관리자" && !Boolean(isAdmin) ? "hidden" : ""
            }${
              item.label === "장바구니" && !Boolean(isLoggedIn) ? " hidden" : ""
            }`}
          >
            <Link href={item.href}>
              <div className="flex items-center gap-1">
                {item.badgeCount ? (
                  <Badge content={item.badgeCount} size="sm" color="primary">
                    {getIconComponent(item.iconType)}
                  </Badge>
                ) : (
                  getIconComponent(item.iconType)
                )}
                {item.label}
              </div>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
