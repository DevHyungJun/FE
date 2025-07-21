import React from "react";
import { PostData } from "@/types/Product";
import FavoriteItem from "./FavoriteItem";

interface FavoriteListProps {
  likeList: PostData[];
  quantities: { id: string; quantity: number }[];
  isAddingToCart: boolean;
  onDelete: (id: string) => void;
  onUpdateQuantity: (id: string, amount: number) => void;
  onAddCart: (id: string) => void;
}

const FavoriteList: React.FC<FavoriteListProps> = ({
  likeList,
  quantities,
  isAddingToCart,
  onDelete,
  onUpdateQuantity,
  onAddCart,
}) => (
  <>
    <h2 className="text-lg bold mb-5">좋아요한 상품 {likeList?.length}개</h2>
    {likeList?.map((likeItem) => (
      <FavoriteItem
        key={likeItem._id}
        item={likeItem}
        quantity={quantities.find((q) => q.id === likeItem._id)?.quantity ?? 1}
        isAddingToCart={isAddingToCart}
        onDelete={onDelete}
        onUpdateQuantity={onUpdateQuantity}
        onAddCart={onAddCart}
      />
    ))}
  </>
);

export default FavoriteList;
