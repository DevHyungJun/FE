import { CartItem } from "@/types/cart";

function totalPrice(selectedItems: CartItem[]): number {
  return selectedItems.reduce((total, item) => total + item.price, 0);
}

export default totalPrice;
