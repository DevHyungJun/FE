'use client';

import formatPrice from "@/util/formatPrice";
import { Image } from "@nextui-org/react";
import useDetail from "@/hooks/useDetail";
import { useEffect } from "react";

type OrderDetailProps = {
  id: string;
  quantity: number;
  setResultPrice: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function OrderDetail({id, quantity, setResultPrice} : OrderDetailProps) {
  const { data: detailData, isLoading } = useDetail(id);
  const price = detailData?.data?.product?.price * quantity;

  useEffect(() => {
    if (price) {
      setResultPrice((prev) => [...prev, price]);
    }
  }, [price]);

  return (
    <div>
      <div className="border-b p-3 rounded-sm">
        <div className="flex gap-3">
          <Image width={100}
            alt="product image"
            src={detailData?.data?.product?.thumbnail}
            className="rounded-md object-contain bg-gray-100"
          />
          <div className="space-y-2 text-sm">
            <p>{detailData?.data?.product?.product_name}</p>
            <p className="text-gray-500">
              {formatPrice(detailData?.data?.product?.price)} / {quantity}개
            </p>
            <p className="font-semibold">
              {formatPrice(price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};