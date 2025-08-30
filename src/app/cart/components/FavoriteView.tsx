import { PostData } from "@/types/Product";
import { useFavorite } from "../hooks/useFavorite";
import EmptyCart from "./EmptyCart";
import FavoriteItem from "./FavoriteItem";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Dispatch, SetStateAction } from "react";

interface FavoriteViewProps {
  cartOrFavorite: "cart" | "favorite";
  setCartOrFavorite: Dispatch<SetStateAction<"cart" | "favorite">>;
}

const FavoriteView = ({
  cartOrFavorite,
  setCartOrFavorite,
}: FavoriteViewProps) => {
  const {
    quantities,
    isAddingToCart,
    handleDeleteFavorite,
    handleUpdateQuantity,
    handleAddCart,
    likeList,
    isLikeListLoading,
  } = useFavorite(setCartOrFavorite);

  if (!likeList || likeList.length === 0) {
    return (
      <EmptyCart
        cartOrFavorite={cartOrFavorite}
        setCartOrFavorite={setCartOrFavorite}
      />
    );
  }

  return isLikeListLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <h2 className="text-lg bold mb-5">좋아요한 상품 {likeList?.length}개</h2>
      {likeList?.map((likeItem: PostData) => (
        <FavoriteItem
          key={likeItem._id}
          item={likeItem}
          quantity={
            quantities.find((q) => q.id === likeItem._id)?.quantity ?? 1
          }
          isAddingToCart={isAddingToCart}
          onDelete={handleDeleteFavorite}
          onUpdateQuantity={handleUpdateQuantity}
          onAddCart={handleAddCart}
        />
      ))}
    </>
  );
};

export default FavoriteView;
