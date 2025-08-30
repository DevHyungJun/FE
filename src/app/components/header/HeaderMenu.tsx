import { NavbarMenu, NavbarMenuItem, Badge } from "@nextui-org/react";
import Link from "next/link";
import useIsLoggedIn from "./hooks/useIsLoggedIn";
import useGetProfileImage from "./hooks/useGetProfileImage";
import GetIconComponent from "./GetIconComponent";

interface HeaderMenuProps {
  menuItems: Array<{
    label: string;
    href: string;
    isOpen: boolean;
    iconType: string;
    badgeCount?: number;
    onclick?: (isLoggedIn: boolean) => void;
  }>;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function HeaderMenu({
  menuItems,
  setIsMenuOpen,
}: HeaderMenuProps) {
  const { isLoggedIn, isAdmin } = useIsLoggedIn();
  const { profileImage } = useGetProfileImage();

  return (
    <NavbarMenu className="bg-gray-50 flex gap-3">
      <div className="mt-1" />
      {menuItems.map((item, index) => (
        <NavbarMenuItem
          key={`${item}-${index}`}
          className={`hover:text-blue-500 ${
            item.label === "관리자" && !Boolean(isAdmin) ? "hidden" : ""
          }${
            item.label === "장바구니" && !Boolean(isLoggedIn) ? "hidden" : ""
          }`}
          isActive={item.isOpen}
        >
          <Link
            className="w-full"
            href={item.href}
            onClick={() => {
              if (item.onclick) {
                item.onclick(isLoggedIn);
                setIsMenuOpen(false);
              }
              setIsMenuOpen(false);
            }}
          >
            <div className="flex items-center gap-2">
              {item.badgeCount ? (
                <Badge content={item.badgeCount} size="sm" color="primary">
                  <GetIconComponent
                    iconType={item.iconType}
                    className="text-xl"
                    profileImage={profileImage}
                  />
                </Badge>
              ) : (
                <GetIconComponent
                  iconType={item.iconType}
                  className="text-xl"
                  profileImage={profileImage}
                />
              )}
              {item.label}
            </div>
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
}
