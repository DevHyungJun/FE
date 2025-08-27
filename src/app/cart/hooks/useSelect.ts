import useRemoveCart from "@/hooks/useRomoveCart";
import { Dispatch, SetStateAction, useMemo } from "react";
import Swal from "sweetalert2";
import { CartData, CartItem } from "@/types/cart";
import { useQueryClient } from "@tanstack/react-query";

const useSelect = (
  items: CartItem[],
  setItems: Dispatch<SetStateAction<CartItem[]>>,
  cartData: CartData | undefined
) => {
  const queryClient = useQueryClient();
  const { mutate: removeMutate } = useRemoveCart();

  const selectedItems = useMemo(
    () => items.filter((item) => item.onSelected),
    [items]
  );

  const isAllSelected = useMemo(() => {
    if (!cartData || cartData.article_list.length === 0) return false;
    return selectedItems.length === cartData.article_list.length;
  }, [selectedItems.length, cartData]);

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
    if (selectedItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "상품을 선택해주세요",
      });
      return;
    }
    selectedItems.forEach((item) => {
      removeMutate(item.article, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
      });
    });
  };

  return {
    selectedItems,
    isAllSelected,
    handleSelectAll,
    handleItemSelect,
    handleRemoveSelected,
  };
};

export default useSelect;
