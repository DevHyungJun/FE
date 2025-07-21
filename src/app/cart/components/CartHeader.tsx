import React from "react";

interface CartHeaderProps {
  cartOrFavorite: string;
  setCartOrFavorite: (value: "cart" | "favorite") => void;
}

const CartHeader = ({ cartOrFavorite, setCartOrFavorite }: CartHeaderProps) => {
  const getButtonStyle = (buttonType: "cart" | "favorite") => {
    const baseStyle =
      "w-1/2 flex justify-center items-center gap-1 text-medium md:text-xl extra-bold text-gray-900 border-b-2 p-2 hover:opacity-100";
    const activeStyle = "border-gray-900";
    const inactiveStyle = "opacity-30 border-gray-300";

    return `${baseStyle} ${
      cartOrFavorite === buttonType ? activeStyle : inactiveStyle
    }`;
  };

  return (
    <div className="flex w-full">
      <button
        className={getButtonStyle("cart")}
        onClick={() => setCartOrFavorite("cart")}
      >
        장바구니
      </button>
      <button
        className={getButtonStyle("favorite")}
        onClick={() => setCartOrFavorite("favorite")}
      >
        좋아요한 상품
      </button>
    </div>
  );
};

export default CartHeader;
