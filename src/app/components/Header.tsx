"use client";

import React from "react";
import { Navbar } from "@nextui-org/react";
import {
  HeaderNavbar,
  HeaderActions,
  HeaderMenu,
  useHeader,
} from "./header/index";

const Header = () => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    chatUI,
    profileImage,
    isLoginOpen,
    isSignupOpen,
    isMypageOpen,
    isAdmin,
    isLoggedIn,
    navbarItems,
    menuItems,
    handleLoginLogout,
    handleSignupMypage,
  } = useHeader();

  if (chatUI) {
    return (
      <div className="hidden sm:block">
        <Navbar
          isBordered
          isBlurred={false}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          className={`${isMenuOpen && "bg-gray-50"}text-gray-800`}
        >
          <HeaderNavbar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            navbarItems={navbarItems}
            isAdmin={isAdmin}
            isLoggedIn={isLoggedIn}
          />
          <HeaderActions
            isLoginOpen={isLoginOpen}
            isSignupOpen={isSignupOpen}
            isMypageOpen={isMypageOpen}
            isLoggedIn={isLoggedIn}
            profileImage={profileImage}
            handleLoginLogout={handleLoginLogout}
            handleSignupMypage={handleSignupMypage}
          />
        </Navbar>
      </div>
    );
  }

  // 일반 헤더 (모바일 + 데스크탑)
  return (
    <Navbar
      isBordered
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={`${isMenuOpen ? "bg-gray-50" : ""}text-gray-800`}
      classNames={{ wrapper: "px-0 gap-0" }}
    >
      <HeaderNavbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navbarItems={navbarItems}
        isAdmin={isAdmin}
        isLoggedIn={isLoggedIn}
      />
      <HeaderActions
        isLoginOpen={isLoginOpen}
        isSignupOpen={isSignupOpen}
        isMypageOpen={isMypageOpen}
        profileImage={profileImage}
        handleLoginLogout={handleLoginLogout}
        handleSignupMypage={handleSignupMypage}
        isLoggedIn={isLoggedIn}
      />
      <HeaderMenu
        key={String(isLoggedIn)}
        menuItems={menuItems}
        isAdmin={isAdmin}
        isLoggedIn={isLoggedIn}
        setIsMenuOpen={setIsMenuOpen}
        profileImage={profileImage}
      />
    </Navbar>
  );
};

export default Header;
