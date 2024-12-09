"use client";

import formatPrice from "@/util/formatPrice";
import { Image } from "@nextui-org/react";
import useDetail from "@/hooks/useDetail";
import { useEffect } from "react";
import Link from "next/link";

type OrderDetailProps = {
  id: string;
  quantity: number;
  setResultPrice: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function OrderDetail({
  id,
  quantity,
  setResultPrice,
}: OrderDetailProps) {
  const { data: detailData, isLoading } = useDetail(id);
  const price = detailData?.data?.product?.price * quantity;

  useEffect(() => {
    if (price) {
      setResultPrice((prev) => {
        // price가 이미 있는지 확인하여 중복 추가 방지
        if (!prev.includes(price)) {
          return [...prev, price];
        }
        return prev;
      });
    }
  }, [price, setResultPrice]);

  return (
    <div>
      <div className="border-b p-3 rounded-sm">
        <div className="flex gap-3">
          <Link href={`/products/product-detail/${id}`}>
            <Image
              width={100}
              alt="product image"
              src={detailData?.data?.product?.thumbnail}
              className="rounded-md object-contain bg-gray-100"
            />
          </Link>
          <div className="space-y-2 text-sm">
            <Link
              href={`/products/product-detail/${id}`}
              className="hover:font-semibold"
            >
              <p>{detailData?.data?.product?.product_name}</p>
            </Link>
            <p className="text-gray-500">
              {formatPrice(detailData?.data?.product?.price)} / {quantity}개
            </p>
            <p className="font-semibold">{formatPrice(price)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
