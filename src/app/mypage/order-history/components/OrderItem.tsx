import Link from "next/link";
import Image from "next/image";
import formatPrice from "@/util/formatPrice";
import { OrderHistoryData, OrderHistoryItem } from "@/types/orderHistory";

interface OrderItemProps {
  order: OrderHistoryData;
}

const OrderItem = ({ order }: OrderItemProps) => {
  if (order.product_list.length === 0) {
    return null;
  }
  const orderDate = new Date(order.createdAt);

  return (
    <div className="border-b-2 pb-4 mb-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">{orderDate.toLocaleDateString()}</p>
        <p className="text-sm text-gray-500">
          {orderDate.toLocaleTimeString()}
        </p>
      </div>
      <div className="my-2 space-y-2 text-sm">
        {order.product_list.map((item: OrderHistoryItem) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
          >
            <div className="flex items-center gap-2">
              <Link href={`/products/product-detail/${item.product._id}`}>
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.product_name}
                  width={48}
                  height={48}
                  className="object-cover rounded-md"
                />
              </Link>
              <div>
                <p className="font-semibold">{item.product.product_name}</p>
                <p className="text-gray-500">{item.quantity}개</p>
              </div>
            </div>
            <p className="font-semibold text-gray-500">
              {formatPrice(item.product.price * item.quantity)}
            </p>
          </div>
        ))}
        <div className="flex justify-end">
          <p className="text-gray-500">
            총 주문가격:{" "}
            <span className="font-semibold text-black text-medium">
              {formatPrice(
                order.product_list.reduce(
                  (total, product) =>
                    total + product.product.price * product.quantity,
                  0
                )
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
