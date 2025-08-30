import React from "react";
import MostPopular from "@/app/components/MostPopular";

interface EmptyCartProps {
  cartOrFavorite: "cart" | "favorite";
  setCartOrFavorite: (value: "cart" | "favorite") => void;
}

const EmptyCart = ({ cartOrFavorite, setCartOrFavorite }: EmptyCartProps) => {
  const text = {
    cartText: "장바구니에 담긴",
    favoriteText: "좋아요를 누른",
  };

  const textRenderState = {
    cartText: "장바구니에 담긴",
    favoriteText: "좋아요를 누른",
    header: cartOrFavorite === "cart" ? text.cartText : text.favoriteText,
    button: cartOrFavorite === "cart" ? text.favoriteText : text.cartText,
  };

  const handleButtonClick = () => {
    if (cartOrFavorite === "cart") {
      setCartOrFavorite("favorite");
      return;
    }
    setCartOrFavorite("cart");
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-10">
      <h2 className="text-lg bold m-1">
        {textRenderState.header} 상품이 없습니다.
      </h2>
      <p className="text-gray-700 text-sm light">상품을 추가해보세요.</p>
      <button
        className="text-sm border p-1 rounded-md mt-3"
        onClick={handleButtonClick}
      >
        {textRenderState.button} 상품 보기
      </button>
      <MostPopular />
    </div>
  );
};

export default EmptyCart;
