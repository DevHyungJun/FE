"use client";

import useGetItem from "@/hooks/useGetItem";
import Image from "next/image";
import formatPrice from "@/util/formatPrice";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import formatDateNumber from "@/util/formatDateNumber";
import ScrollUpButton from "@/app/components/ScrollUpButton";
import useGuestOut from "@/hooks/useGuestOut";

type ItemListType = {
  createdAt: string;
  images: string[];
  price: number;
  product_name: string;
  stock_quantity: number;
  thumbnail: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
};

export default function ItemList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetItem();
  useGuestOut(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allProducts = data?.pages?.flatMap((page) => page.data) ?? [];

  return (
    <div className="max-w-[1200px] mx-auto">
      <h2 className="flex items-center gap-2 text-2xl extra-bold my-5">
        {allProducts?.length === 0
          ? "등록된 상품이 없습니다"
          : "관리자 상품 목록"}
      </h2>
      {isLoading && allProducts.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="sm:max-w-full mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs md:text-sm p-1">
          {allProducts.map((item: ItemListType) => (
            <div
              key={item?._id}
              className="flex flex-col gap-2 max-w-[200px] md:max-w-[300px] text-sm text-gray-800 mx-auto"
            >
              <Image
                src={item?.thumbnail}
                alt={item?.product_name}
                width={300}
                height={300}
                className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-md object-contain bg-gray-100"
              />
              <div>
                <p className="text-xs line-clamp-1 text-ellipsis overflow-hidden px-2">
                  {item?.product_name}
                </p>
                <p className="bold px-2">{formatPrice(item?.price)}</p>
                <div className="flex justify-between px-2 text-xs text-gray-400 light">
                  <p>{formatDateNumber(item?.createdAt)}</p>
                  <p>
                    <span className="regular">{item?.stock_quantity}</span>개의
                    재고
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div ref={ref} className="h-10">
        {isFetchingNextPage && <LoadingSpinner mode="1" />}
      </div>

      <ScrollUpButton />
    </div>
  );
}
