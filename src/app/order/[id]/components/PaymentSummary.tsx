import formatPrice from "@/util/formatPrice";
import { DELIVERY_PRICE } from "@/constants/order";

interface PaymentSummaryProps {
  resultPrice: number;
}

export default function PaymentSummary({ resultPrice }: PaymentSummaryProps) {
  const totalPrice = resultPrice + DELIVERY_PRICE;

  return (
    <div className="p-3 rounded-sm space-y-2">
      <h2 className="text-lg font-semibold mb-5">결제 금액</h2>
      <div className="flex justify-between text-sm">
        <p className="text-gray-500">상품 금액</p>
        <p>{formatPrice(resultPrice)}</p>
      </div>
      <div className="flex justify-between text-sm">
        <p className="text-gray-500">배송비</p>
        <p>{formatPrice(DELIVERY_PRICE)}</p>
      </div>
      <div className="flex justify-between font-semibold">
        <h3>총 결제 금액</h3>
        <p>{formatPrice(totalPrice)}</p>
      </div>
    </div>
  );
}
