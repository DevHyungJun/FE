import useDetail from "@/hooks/useDetail";
import useRemoveCart from "@/hooks/useRomoveCart";
import { CartItem } from "@/types/cart";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";

const useCartProductDetailAction = (
  item: CartItem,
  setItems: Dispatch<SetStateAction<CartItem[]>>
) => {
  const {
    data: productData,
    isSuccess: productIsSuccess,
    isPending,
  } = useDetail(item.article, !!item.article);
  const { mutate: removeMutate } = useRemoveCart();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!productIsSuccess) return;
    setItems((prev) => {
      return prev.map((prevItem) => {
        if (prevItem.article === item.article) {
          return {
            ...prevItem,
            price: productData?.data?.product?.price * item.quantity || 0,
            product: productData?.data?.product?._id,
          };
        }
        return prevItem;
      });
    });
  }, [productIsSuccess]);

  const handleCartItemRemove = (id: string) => {
    removeMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });
  };

  return { productData, isPending, handleCartItemRemove };
};

export default useCartProductDetailAction;
