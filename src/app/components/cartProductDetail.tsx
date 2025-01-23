"use client";

import { Image } from "@nextui-org/react";
import formatPrice from "@/util/formatPrice";
import useDetail from "@/hooks/useDetail";
import { IoIosClose } from "react-icons/io";
import useRemoveCart from "@/hooks/useRomoveCart";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";
import ProductDetail from "../products/product-detail/[id]/page";

interface Item {
  article: string;
  product: string;
  quantity: number;
  price: number;
  onSelected: boolean;
}

interface CartProductDetailProps {
  item: Item;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

export default function CartProductDetail({
  item,
  setItems,
}: CartProductDetailProps) {
  const {
    data: productData,
    isSuccess: productIsSuccess,
    isPending,
  } = useDetail(item.article, !!item.article);
  const { mutate: removeMutate } = useRemoveCart();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!productIsSuccess) return;
    setItems((prev) => {
      return prev.map((prevItem) => {
        if (prevItem.article === item.article) {
          return {
            ...prevItem,
            price: productData?.data?.product?.price * item.quantity || 0,
            product: productData?.data?.product?._id,
          };
        }
        return prevItem;
      });
    });
  }, [productIsSuccess]);

  const handleCartItemRemove = (id: string) => {
    removeMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });
  };

  return (
    <div className="flex-grow border-b p-3 rounded-sm">
      <div className="flex gap-3">
        <Link href={`/products/product-detail/${productData?.data?._id}`}>
          <Image
            width={100}
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
