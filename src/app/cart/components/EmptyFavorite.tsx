import React from "react";
import MostPopular from "@/app/components/MostPopular";

interface EmptyFavoriteProps {
  setCartOrFavorite: (value: string) => void;
}

const EmptyFavorite: React.FC<EmptyFavoriteProps> = ({ setCartOrFavorite }) => (
  <div className="flex flex-col items-center gap-3 mt-10">
    <h2 className="text-lg bold m-1">좋아요한 상품이 없습니다.</h2>
    <p className="text-gray-700 text-sm light">상품을 추가해보세요.</p>
    <button
      className="text-sm border p-1 rounded-md mt-3"
      onClick={() => setCartOrFavorite("cart")}
    >
      장바구니 살펴보기
    </button>
    <MostPopular />
  </div>
);

export default EmptyFavorite;
