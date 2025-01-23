"use client";

import formatPrice from "@/util/formatPrice";
import { Image } from "@nextui-org/react";
import Link from "next/link";

interface OrderDetailProps {
  productData: {
    product: {
      _id: string;
      product_name: string;
      user: string;
      price: number;
      stock_quantity: number;
      thumbnail: string;
      quantity: number;
    };
    quantity: number;
    _id: string;
  };
}

export default function OrderDetail({ productData }: OrderDetailProps) {
  return (
    <div>
      <div className="border-b p-3 rounded-sm">
        <div className="flex gap-3">
          <Link href={`/products/product-detail/${productData?._id}`}>
            <Image
              width={100}
              alt="product image"
              src={productData?.product?.thumbnail}
              className="rounded-md object-contain bg-gray-100"
            />
          </Link>
          <div className="space-y-2 text-sm">
            <Link
              href={`/products/product-detail/${productData?._id}`}
              className="hover:font-semibold"
            >
              <p>{productData?.product?.product_name}</p>
            </Link>
            <p className="text-gray-500">
              {formatPrice(productData?.product?.price)} /{" "}
              {productData?.quantity}개
            </p>
            <p className="font-semibold">
              {formatPrice(productData?.product?.price * productData?.quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
