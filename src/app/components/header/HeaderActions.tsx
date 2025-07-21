import React from "react";
import { NavbarContent, NavbarItem, Image } from "@nextui-org/react";
import { CiLogout, CiLogin } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";

interface HeaderActionsProps {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  isMypageOpen: boolean;
  profileImage?: string;
  handleLoginLogout: () => void;
  handleSignupMypage: () => void;
  isLoggedIn: boolean;
}

const getIconComponent = (iconType: string, className: string = "text-lg") => {
  switch (iconType) {
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

export default function HeaderActions({
  isLoginOpen,
  isSignupOpen,
  isMypageOpen,
  profileImage,
  handleLoginLogout,
  handleSignupMypage,
  isLoggedIn,
}: HeaderActionsProps) {
  return (
    <NavbarContent justify="end">
      <NavbarItem
        className={`hidden sm:flex cursor-pointer text-sm hover:text-blue-500 ${
          isLoginOpen ? "bold" : ""
        }`}
        onClick={handleLoginLogout}
      >
        {!Boolean(isLoggedIn) ? (
          <div className="flex items-center gap-1">
            {getIconComponent("login")}
            로그인
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {getIconComponent("logout")}
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
        {!Boolean(isLoggedIn) ? (
          <div className="flex items-center gap-1">
            {getIconComponent("person-add")}
            회원가입
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Image
              src={profileImage ? profileImage : "/basic_profile.png"}
              alt="Profile Image"
              width={20}
              height={20}
            />
            마이페이지
          </div>
        )}
      </NavbarItem>
    </NavbarContent>
  );
}
