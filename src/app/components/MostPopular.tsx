"use client";

import useAllProducts from "@/hooks/useAllProducts";
import ProductCard from "./ProductCard";
import { PostData } from "@/types/Product";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import LoadingSpinner from "./LoadingSpinner";
import { InfiniteProductPostResponse } from "@/types/allProducts";
import ScrollButton from "./ScrollButton";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import Link from "next/link";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

const SCROLL_AMOUNT = 250;

export default function MostPopular() {
  const { data } = useAllProducts("", 5) as UseInfiniteQueryResult<
    InfiniteProductPostResponse,
    Error
  >;
  const { scrollRef, scroll, startScrolling, stopScrolling } =
    useHorizontalScroll(SCROLL_AMOUNT);

  return (
    <>
      <div className="flex flex-col w-full gap-5 mt-10 p-1 scrollbar-hide">
        <div
          ref={scrollRef}
          className="flex gap-1 w-full mx-auto overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {data &&
            data?.pages[0]?.data?.results.map((product: PostData) => (
              <ProductCard key={product._id} product={product} mode="fixed" />
            ))}
        </div>
      </div>
      <div className="justify-center items-center hidden sm:flex xl:hidden">
        <ScrollButton
          direction="left"
          icon={
            <FaAnglesLeft className="text-xl text-gray-300 hover:text-gray-700" />
          }
          scroll={scroll}
          startScrolling={startScrolling}
          stopScrolling={stopScrolling}
        />
        <div className="bg-gray-300 h-[3px] rounded-xl w-10"></div>
        <ScrollButton
          direction="right"
          icon={
            <FaAnglesRight className="text-xl text-gray-300 hover:text-gray-700" />
          }
          scroll={scroll}
          startScrolling={startScrolling}
          stopScrolling={stopScrolling}
        />
      </div>
      <div className="flex justify-center my-5">
        <Link href="/products">
          <button className="border px-8 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-100">
            전체 상품 보기
          </button>
        </Link>
      </div>
    </>
  );
}
