import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useFavoriteDelete from "@/hooks/useFavoriteDelete";
import useAddCart from "@/hooks/useAddCart";
import { PostData } from "@/types/Product";
import useLikeList from "@/hooks/useLikeList";

interface Quantity {
  quantity: number;
  id: string;
}

export const useFavorite = (
  setCartOrFavorite: Dispatch<SetStateAction<"cart" | "favorite">>
) => {
  const queryClient = useQueryClient();
  const { mutate: favoriteDeleteMutate } = useFavoriteDelete();
  const { mutate: addCartMutate, isPending: isAddingToCart } = useAddCart();
  const { data, isLoading: isLikeListLoading } = useLikeList();
  const likeList = data?.data?.articles;
  const [quantities, setQuantities] = useState<Quantity[]>([]);

  useEffect(() => {
    if (likeList) {
      const quantityList = likeList.map((item: PostData) => ({
        quantity: 1,
        id: item._id,
      }));
      setQuantities(quantityList);
    }
  }, [likeList]);

  const handleDeleteFavorite = (id: string) => {
    favoriteDeleteMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allProducts"] });
        queryClient.invalidateQueries({ queryKey: ["likeList"] });
        queryClient.invalidateQueries({ queryKey: ["productDetail", id] });
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "좋아요",
          text: "상품을 좋아요 목록에서 삭제하지 못했습니다.",
        });
      },
    });
  };

  const handleUpdateQuantity = (id: string, amount: number) => {
    setQuantities((prev) =>
      prev?.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const handleAddCart = (id: string) => {
    const quantityValue = quantities?.find((item) => item.id === id)?.quantity;
    if (!quantityValue) return;

    addCartMutate(
      { article: id, quantity: quantityValue },
      {
        onSuccess: () => {
          Swal.fire({
            text: `${quantityValue}개의 상품이 장바구니에 추가되었습니다.`,
            showConfirmButton: false,
            timer: 1000,
          });
          queryClient.invalidateQueries({ queryKey: ["cart"] });
          setCartOrFavorite("cart");
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "장바구니",
            text: "상품을 장바구니에 추가하지 못했습니다.",
          });
        },
      }
    );
  };

  return {
    quantities,
    isAddingToCart,
    handleDeleteFavorite,
    handleUpdateQuantity,
    handleAddCart,
    likeList,
    isLikeListLoading,
  };
};
