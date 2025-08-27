"use client";

import { Button } from "@nextui-org/react";
import formatPrice from "@/util/formatPrice";
import totalPrice from "../utills/totalPrice";
import { CartItem } from "@/types/cart";
import useOrder from "@/hooks/useOrder";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface CartTotalProps {
  selectedItems: CartItem[];
  hasSelectedItems: boolean;
}

const CartTotal = ({ selectedItems, hasSelectedItems }: CartTotalProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: orderMutate, isPending: isOrdering } = useOrder();

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

  return (
    <Button
      color="primary"
      className="w-full mt-1 bold"
      isDisabled={!hasSelectedItems}
      isLoading={isOrdering}
      onClick={handleOrder}
    >
      <p>
        {hasSelectedItems
          ? `${formatPrice(totalPrice(selectedItems))} 결제하기`
          : "상품을 선택해주세요"}
      </p>
    </Button>
  );
};

export default CartTotal;
