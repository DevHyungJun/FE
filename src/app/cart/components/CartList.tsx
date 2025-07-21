import React from "react";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import CartProductDetail from "@/app/components/CartProductDetail";
import { CartItem } from "../hooks/useCart";

interface CartListProps {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  handleItemSelect: (article: string) => void;
}

const CartList = ({ items, setItems, handleItemSelect }: CartListProps) => (
  <CheckboxGroup
    value={items.filter((item) => item.onSelected).map((item) => item.article)}
  >
    {items.map((item) => (
      <div className="flex" key={item.article}>
        <Checkbox
          value={item.article}
          isSelected={item.onSelected}
          onChange={() => handleItemSelect(item.article)}
        />
        <CartProductDetail item={item} setItems={setItems} />
      </div>
    ))}
  </CheckboxGroup>
);

export default CartList;
