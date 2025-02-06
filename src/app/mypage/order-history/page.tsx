"use client";

import useGetPayment from "@/hooks/useGetPayment";
import { useEffect, useState } from "react";
import formatPrice from "@/util/formatPrice";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ScrollUpButton from "@/app/components/ScrollUpButton";
import { Button } from "@nextui-org/react";

interface OrderHistoryProduct {
  created_at: string;
  images: string[];
  price: number;
  product_name: string;
  sales_count: number;
  stock_quantity: number;
  thumbnail: string;
  updated_at: string;
  user: string;
  __v: number;
  _id: string;
}

interface OrderHistoryItem {
  product: OrderHistoryProduct;
  quantity: number;
  _id: string;
}

interface OrderHistoryData {
  createdAt: string;
  product_list: OrderHistoryItem[];
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

export default function OrderHistory() {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<OrderHistoryData[]>([]);
  const { data, isLoading } = useGetPayment(page);

  useEffect(() => {
    if (data) {
      setOrders((prev) => [...prev, ...data.data.results]);
    }
  }, [data]);

  const handleNextPage = () => {
    if (!data?.data?.next) return;
    setPage((prev) => prev + 1);
  };

  return (
    <div className="mx-auto max-w-[800px] text-gray-800">
      <div className="w-full p-5 bg-white rounded-md">
        <h1 className="text-2xl extra-bold my-5">주문조회</h1>
        {page === 1 && isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map(
              (order: OrderHistoryData) =>
                order.product_list.length > 0 && (
                  <div key={order._id} className="border-b-2 pb-4 mb-4">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="my-2 space-y-2 text-sm">
                      {order.product_list.map((product: OrderHistoryItem) => (
                        <div
                          key={product._id}
                          className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <Link href={`/product/${product.product._id}`}>
                              <Image
                                src={product.product.thumbnail}
                                alt={product.product.product_name}
                                width={48}
                                height={48}
                                className="object-cover rounded-md"
                              />
                            </Link>
                            <div>
                              <p className="font-semibold">
                                {product.product.product_name}
                              </p>
                              <p className="text-gray-500">
                                {product.quantity}개
                              </p>
                            </div>
                          </div>
                          <p className="font-semibold text-gray-500">
                            {formatPrice(
                              product.product.price * product.quantity
                            )}
                          </p>
                        </div>
                      ))}

                      <div className="flex justify-end">
                        <p className="text-gray-500">
                          총 주문가격:{" "}
                          <span className="font-semibold text-black text-medium">
                            {" "}
                            {formatPrice(
                              order.product_list.reduce(
                                (total, product) =>
                                  total +
                                  product.product.price * product.quantity,
                                0
                              )
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
        {data?.data?.next && (
          <Button
            className="w-full"
            color="primary"
            onClick={handleNextPage}
            isLoading={page !== 1 && isLoading}
          >
            더 보기
          </Button>
        )}
      </div>
      <ScrollUpButton />
    </div>
  );
}
