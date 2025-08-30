"use client";

import { Navbar } from "@nextui-org/react";
import {
  HeaderNavbar,
  HeaderActions,
  HeaderMenu,
  useHeader,
} from "./header/index";
import { chatUIState } from "@/store";

const Header = () => {
  const { isMenuOpen, setIsMenuOpen, navbarItems, menuItems } = useHeader();
  const { chatUI } = chatUIState();

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
          />
          <HeaderActions />
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
      />
      <HeaderActions />
      <HeaderMenu menuItems={menuItems} setIsMenuOpen={setIsMenuOpen} />
    </Navbar>
  );
};

export default Header;
