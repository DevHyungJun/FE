import { PostData } from "@/types/Product";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useGetCart from "@/hooks/useGetCart";
import useLikeList from "@/hooks/useLikeList";
import useRemoveCart from "@/hooks/useRomoveCart";
import useOrder from "@/hooks/useOrder";

export interface CartItem {
  article: string;
  product: string;
  quantity: number;
  price: number;
  onSelected: boolean;
}

export const useCart = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: cartData, isLoading: isCartLoading } = useGetCart();
  const { data: likeList, isLoading: isLikeListLoading } = useLikeList();
  const { mutate: removeMutate } = useRemoveCart();
  const { mutate: orderMutate, isPending: isOrdering } = useOrder();

  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOrFavorite, setCartOrFavorite] = useState("cart");

  useEffect(() => {
    if (cartData) {
      setItems(
        cartData.article_list.map(
          (item: { article: string; quantity: number }) => ({
            article: item.article,
            product: "",
            quantity: item.quantity,
            price: 0,
            onSelected: false,
          })
        )
      );
    }
  }, [cartData]);

  const selectedItems = useMemo(
    () => items.filter((item) => item.onSelected),
    [items]
  );

  const isAllSelected = useMemo(() => {
    if (!cartData || cartData.article_list.length === 0) return false;
    return selectedItems.length === cartData.article_list.length;
  }, [selectedItems.length, cartData]);

  const totalPrice = useMemo(() => {
    return selectedItems.reduce((total, item) => total + item.price, 0);
  }, [selectedItems]);

  const handleSelectAll = () => {
    setItems((currentItems) =>
      currentItems.map((item) => ({ ...item, onSelected: !isAllSelected }))
    );
  };

  const handleItemSelect = (checkedItemArticle: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.article === checkedItemArticle
          ? { ...item, onSelected: !item.onSelected }
          : item
      )
    );
  };

  const handleRemoveSelected = () => {
    if (selectedItems.length === 0) return;
    selectedItems.forEach((item) => {
      removeMutate(item.article, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
      });
    });
  };

  const handleOrder = () => {
    if (selectedItems.length === 0) return;
    const orderData = selectedItems.map((item) => ({
      articleId: item.article,
      product: item.product,
      quantity: item.quantity,
    }));
    orderMutate(orderData, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        router.push(`/order/${data?.data?._id}`);
      },
    });
  };

  return {
    items,
    setItems,
    cartData,
    likeList,
    cartOrFavorite,
    selectedItems,
    totalPrice,
    isAllSelected,
    isLoading: isCartLoading || isLikeListLoading,
    isOrdering,
    setCartOrFavorite,
    handleSelectAll,
    handleItemSelect,
    handleRemoveSelected,
    handleOrder,
  };
};
