import { useEffect, useState } from "react";
import useGetCart from "@/hooks/useGetCart";
import useLikeList from "@/hooks/useLikeList";
import { CartItem } from "@/types/cart";

export const useCart = () => {
  const { data: cartData, isLoading: isCartLoading } = useGetCart();
  const [items, setItems] = useState<CartItem[]>([]);

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

  return {
    items,
    setItems,
    cartData,
    isCartLoading,
  };
};
