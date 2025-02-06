"use client";

import formatPrice from "@/util/formatPrice";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import useDetail from "@/hooks/useDetail";
import { useEffect } from "react";

interface OrderDetailProps {
  articleId: string;
  quantity: number;
  setProductList: React.Dispatch<
    React.SetStateAction<{ product: string; price: number }[]>
  >;
}

export default function OrderDetail({
  articleId,
  quantity,
  setProductList,
}: OrderDetailProps) {
  const { data: productData } = useDetail(articleId, !!articleId);

  useEffect(() => {
    if (productData) {
      setProductList((prev) => {
        const isProductExist = prev.some(
          (item) => item.product === productData?.data?.product?._id
        );
        if (isProductExist) {
          return prev;
        }
        return [
          ...prev,
          {
            product: productData?.data?.product?._id,
            price: productData.data.product.price * quantity,
          },
        ];
      });
    }
  }, [productData]);

  return (
    <div>
      <div className="border-b p-3 rounded-sm">
        <div className="flex gap-3">
          <Link href={`/products/product-detail/${productData?.data?._id}`}>
            <Image
              width={100}
              alt="product image"
              src={productData?.data?.product?.thumbnail}
              className="rounded-md object-contain bg-gray-100"
            />
          </Link>
          <div className="space-y-2 text-sm">
            <Link
              href={`/products/product-detail/${productData?.data?._id}`}
              className="hover:font-semibold"
            >
              <p>{productData?.data?.product?.product_name}</p>
            </Link>
            <p className="text-gray-500">
              {formatPrice(productData?.data?.product?.price)} / {quantity}개
            </p>
            <p className="font-semibold">
              {formatPrice(productData?.data?.product?.price * quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
