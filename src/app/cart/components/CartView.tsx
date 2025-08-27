import React from "react";
import CartActions from "./CartActions";
import CartList from "./CartList";
import CartTotal from "./CartTotal";
import useSelect from "../hooks/useSelect";
import { useCart } from "../hooks/useCart";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import EmptyCart from "./EmptyCart";

interface CartViewProps {
  setCartOrFavorite: (value: string) => void;
}

const CartView = ({ setCartOrFavorite }: CartViewProps) => {
  const { items, setItems, cartData, isCartLoading } = useCart();
  const {
    handleItemSelect,
    handleRemoveSelected,
    handleSelectAll,
    isAllSelected,
    selectedItems,
  } = useSelect(items, setItems, cartData);

  if (!cartData?.article_list || cartData.article_list.length === 0) {
    return <EmptyCart setCartOrFavorite={setCartOrFavorite} />;
  }

  return isCartLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <CartActions
        isAllSelected={isAllSelected}
        cartItemCount={cartData.article_list.length}
        handleSelectAll={handleSelectAll}
        handleRemoveSelected={handleRemoveSelected}
      />
      <CartList
        items={items}
        setItems={setItems}
        handleItemSelect={handleItemSelect}
      />
      <CartTotal
        selectedItems={selectedItems}
        hasSelectedItems={selectedItems.length > 0}
      />
    </>
  );
};

export default CartView;
