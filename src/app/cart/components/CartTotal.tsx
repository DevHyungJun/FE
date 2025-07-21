import React from "react";
import { Button } from "@nextui-org/react";
import formatPrice from "@/util/formatPrice";

interface CartTotalProps {
  totalPrice: number;
  isOrdering: boolean;
  hasSelectedItems: boolean;
  handleOrder: () => void;
}

const CartTotal = ({
  totalPrice,
  isOrdering,
  hasSelectedItems,
  handleOrder,
}: CartTotalProps) => (
  <Button
    color="primary"
    className="w-full mt-1 bold"
    isDisabled={!hasSelectedItems}
    isLoading={isOrdering}
    onClick={handleOrder}
  >
    <p>
      {hasSelectedItems
        ? `${formatPrice(totalPrice)} 결제하기`
        : "상품을 선택해주세요"}
    </p>
  </Button>
);

export default CartTotal;
