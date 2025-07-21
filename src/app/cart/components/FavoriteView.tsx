import { PostData } from "@/types/Product";
import { useFavorite } from "../hooks/useFavorite";
import EmptyFavorite from "./EmptyFavorite";
import FavoriteList from "./FavoriteList";

interface FavoriteProps {
  likeList: PostData[];
  setCartOrFavorite: (value: string) => void;
}

export default function FavoriteView({
  likeList,
  setCartOrFavorite,
}: FavoriteProps) {
  const {
    quantities,
    isAddingToCart,
    handleDeleteFavorite,
    handleUpdateQuantity,
    handleAddCart,
  } = useFavorite(likeList, setCartOrFavorite);

  if (!likeList || likeList.length === 0) {
    return <EmptyFavorite setCartOrFavorite={setCartOrFavorite} />;
  }

  return (
    <FavoriteList
      likeList={likeList}
      quantities={quantities}
      isAddingToCart={isAddingToCart}
      onDelete={handleDeleteFavorite}
      onUpdateQuantity={handleUpdateQuantity}
      onAddCart={handleAddCart}
    />
  );
}
