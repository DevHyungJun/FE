"use client";

import Image from "next/image";
import formatPrice from "@/util/formatPrice";
import useAllProducts from "@/hooks/useAllProducts";
import { PostData } from "../../../types/Product";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import Link from "next/link";
import { InfiniteProductPostResponse } from "../../../types/allProducts";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

export default function MostPopular() {
  const router = useRouter();
  const { data } = useAllProducts("", 5) as UseInfiniteQueryResult<
    InfiniteProductPostResponse,
    Error
  >;
  const scrollItem = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<number | null>(null);

  const handleRouteProductDetail = (productID: string) =>
    router.push(`products/product-detail/${productID}`);

  const handleClickScroll = (direction: "left" | "right") => {
    if (!scrollItem.current) return;
    if (direction === "left") {
      scrollItem.current.scrollLeft -= 250;
    } else {
      scrollItem.current.scrollLeft += 250;
    }
  };

  const startScrolling = (direction: "left" | "right") => {
    const scroll = () => {
      if (!scrollItem.current) return;

      if (direction === "left") {
        scrollItem.current.scrollLeft -= 250; // 적은 양으로 부드럽게
      } else {
        scrollItem.current.scrollLeft += 250;
      }

      scrollAnimationRef.current = requestAnimationFrame(scroll);
    };

    scroll();
  };

  const stopScrolling = () => {
    if (!scrollAnimationRef.current) return;
    cancelAnimationFrame(scrollAnimationRef.current);
    scrollAnimationRef.current = null;
  };

  return (
    <>
      <div className="flex flex-col w-full gap-5 mt-10 p-1 scrollbar-hide">
        <div
          ref={scrollItem}
          className="flex gap-1 w-full mx-auto overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {data?.pages[0]?.data?.results.map((product: PostData) => (
            <div
              key={product._id}
              className="flex flex-col gap-2 w-[250px] min-w-[250px] text-sm text-gray-800 cursor-pointer hover:animate-hover-up hover:shadow-md rounded-md"
              onClick={() => handleRouteProductDetail(product?._id)}
            >
              <Image
                src={product?.product?.thumbnail}
                alt={product?.title}
                width={250}
                height={250}
                className="w-[250px] h-[250px] rounded-md object-contain bg-gray-100"
              />
              <div className="p-2">
                <p className="text-xs line-clamp-1 text-ellipsis overflow-hidden">
                  {product.title}
                </p>
                <div className="flex justify-between items-center">
                  <p className="bold">{formatPrice(product?.product?.price)}</p>
                </div>
                <div className="flex gap-2 text-xs text-gray-400 light h-[16px]">
                  {product?.like_count !== 0 && (
                    <p>좋아요 {product?.like_count}</p>
                  )}
                  {product?.comment_list.length !== 0 && (
                    <p>상품평 {product?.comment_list.length}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="justify-center items-center hidden sm:flex xl:hidden">
        <button
          onMouseDown={() => startScrolling("left")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          onTouchStart={() => startScrolling("left")}
          onTouchEnd={stopScrolling}
          onTouchCancel={stopScrolling}
          onClick={() => handleClickScroll("left")}
        >
          <FaAnglesLeft className="text-xl text-gray-300 hover:text-gray-700" />
        </button>
        <div className="bg-gray-300 h-[3px] rounded-xl w-10"></div>
        <button
          onMouseDown={() => startScrolling("right")}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          onTouchStart={() => startScrolling("right")}
          onTouchEnd={stopScrolling}
          onTouchCancel={stopScrolling}
          onClick={() => handleClickScroll("right")}
        >
          <FaAnglesRight className="text-xl text-gray-300 hover:text-gray-700" />
        </button>
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
