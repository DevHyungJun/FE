import { PostData } from "@/types/Product";
import { useFavorite } from "../hooks/useFavorite";
import EmptyFavorite from "./EmptyFavorite";
import FavoriteItem from "./FavoriteItem";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface FavoriteViewProps {
  setCartOrFavorite: (value: string) => void;
}

const FavoriteView = ({ setCartOrFavorite }: FavoriteViewProps) => {
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
    return <EmptyFavorite setCartOrFavorite={setCartOrFavorite} />;
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
