import React from "react";
import { NavbarMenu, NavbarMenuItem, Image, Badge } from "@nextui-org/react";
import {
  CiLogout,
  CiLogin,
  CiShoppingCart,
  CiShoppingTag,
} from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";
import Link from "next/link";

interface HeaderMenuProps {
  menuItems: Array<{
    label: string;
    href: string;
    isOpen: boolean;
    iconType: string;
    badgeCount?: number;
    onclick?: () => void;
  }>;
  isAdmin: boolean;
  isLoggedIn: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  profileImage?: string;
}

const getIconComponent = (
  iconType: string,
  className: string = "text-xl",
  profileImage?: string
) => {
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
    case "profile":
      return (
        <Image
          src={profileImage ? profileImage : "/basic_profile.png"}
          alt="Profile Image"
          width={20}
          height={20}
          radius="full"
        />
      );
    default:
      return null;
  }
};

export default function HeaderMenu({
  menuItems,
  isAdmin,
  isLoggedIn,
  setIsMenuOpen,
  profileImage,
}: HeaderMenuProps) {
  return (
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
            <div className="flex items-center gap-2">
              {item.badgeCount ? (
                <Badge content={item.badgeCount} size="sm" color="primary">
                  {getIconComponent(item.iconType, "text-xl", profileImage)}
                </Badge>
              ) : (
                getIconComponent(item.iconType, "text-xl", profileImage)
              )}
              {item.label}
            </div>
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
}
