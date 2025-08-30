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
import useIsLoggedIn from "./hooks/useIsLoggedIn";
import GetIconComponent from "./GetIconComponent";

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
}

export default function HeaderNavbar({
  isMenuOpen,
  setIsMenuOpen,
  navbarItems,
}: HeaderNavbarProps) {
  const { isAdmin, isLoggedIn } = useIsLoggedIn();

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
                    <GetIconComponent
                      iconType={item.iconType}
                      className="text-xl"
                    />
                  </Badge>
                ) : (
                  <GetIconComponent
                    iconType={item.iconType}
                    className="text-xl"
                  />
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
