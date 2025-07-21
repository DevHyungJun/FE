import { Button } from "@nextui-org/react";

import formatPrice from "@/util/formatPrice";
import { DELIVERY_PRICE } from "@/constants/order";

interface PaymentButtonProps {
  resultPrice: number;
  onClick: () => void;
}

export default function PaymentButton({
  resultPrice,
  onClick,
}: PaymentButtonProps) {
  const totalPrice = resultPrice + DELIVERY_PRICE;
  return (
    <Button color="primary" className="w-full mt-1" onClick={onClick}>
      {formatPrice(totalPrice)}
      <p>결제하기</p>
    </Button>
  );
}
