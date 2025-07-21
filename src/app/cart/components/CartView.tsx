import React from "react";
import CartActions from "./CartActions";
import CartList from "./CartList";
import CartTotal from "./CartTotal";
import { CartItem } from "../hooks/useCart";

interface CartViewProps {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isAllSelected: boolean;
  totalPrice: number;
  isOrdering: boolean;
  selectedItems: CartItem[];
  cartItemCount: number;
  handleSelectAll: () => void;
  handleItemSelect: (article: string) => void;
  handleRemoveSelected: () => void;
  handleOrder: () => void;
}

const CartView = ({
  items,
  setItems,
  isAllSelected,
  totalPrice,
  isOrdering,
  selectedItems,
  cartItemCount,
  handleSelectAll,
  handleItemSelect,
  handleRemoveSelected,
  handleOrder,
}: CartViewProps) => (
  <>
    <CartActions
      isAllSelected={isAllSelected}
      cartItemCount={cartItemCount}
      handleSelectAll={handleSelectAll}
      handleRemoveSelected={handleRemoveSelected}
    />
    <CartList
      items={items}
      setItems={setItems}
      handleItemSelect={handleItemSelect}
    />
    <CartTotal
      totalPrice={totalPrice}
      isOrdering={isOrdering}
      hasSelectedItems={selectedItems.length > 0}
      handleOrder={handleOrder}
    />
  </>
);

export default CartView;
