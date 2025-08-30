"use client";

import { Image } from "@nextui-org/react";
import formatPrice from "@/util/formatPrice";
import { IoIosClose } from "react-icons/io";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";
import { CartItem } from "@/types/cart";
import useCartProductDetailAction from "../cart/hooks/useCartProductDetailAction";

interface CartProductDetailProps {
  item: CartItem;
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function CartProductDetail({
  item,
  setItems,
}: CartProductDetailProps) {
  const { productData, isPending, handleCartItemRemove } =
    useCartProductDetailAction(item, setItems);

  return (
    <div className="flex-grow border-b p-3 rounded-sm">
      <div className="flex gap-3">
        <Link href={`/products/product-detail/${productData?.data?._id}`}>
          <Image
            width={100}
            height={100}
            alt="product image"
            src={productData?.data?.product?.thumbnail}
            className="rounded-md object-contain bg-gray-100"
          />
        </Link>
        <div className="flex-grow space-y-2 text-sm">
          {isPending ? (
            <LoadingSpinner mode="1" />
          ) : (
            <>
              <div className="flex justify-between">
                <Link
                  href={`/products/product-detail/${productData?.data?._id}`}
                  className="hover:font-semibold"
                >
                  <p className="text-xs md:text-sm">
                    {productData?.data?.product?.product_name}
                  </p>
                </Link>
                <button
                  className="text-3xl"
                  onClick={() => handleCartItemRemove(productData?.data?._id)}
                >
                  <IoIosClose />
                </button>
              </div>
              <p className="text-gray-500 light">
                {formatPrice(productData?.data?.product?.price)} /{" "}
                {item.quantity}개
              </p>
              <p className="bold">
                {formatPrice(productData?.data?.product?.price * item.quantity)}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
