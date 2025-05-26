"use client";

import { Tabs, Tab } from "@nextui-org/react";
import Image from "next/image";
import useAllProducts from "@/hooks/useAllProducts";
import { useRouter } from "next/navigation";
import formatPrice from "@/util/formatPrice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { PostData } from "../../../types/Product";
import { IoHeartSharp } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { CiShoppingTag } from "react-icons/ci";
import useGetCategory from "@/hooks/useGetCategory";
import ScrollUpButton from "../components/ScrollUpButton";
import { InfiniteProductPostResponse } from "../../../types/allProducts";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

type AuthCheckResponse = {
  code: number;
  data: {
    email: string;
    isLoggedIn: boolean;
    role: string;
    userId: string;
    username: string;
    message: string;
  };
};

const Products = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<AuthCheckResponse>(["authCheck"]);
  const userId = cachedData?.data?.userId;

  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: category } = useGetCategory();
  const { ref, inView } = useInView({ threshold: 0.1, rootMargin: "100px" });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useAllProducts(selectedCategory) as UseInfiniteQueryResult<
      InfiniteProductPostResponse,
      Error
    >;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleRouteProductDetail = (productID: string) =>
    router.push(`products/product-detail/${productID}`);

  const FavoriteShow = (like_user_list: string[]) => {
    if (userId && like_user_list?.includes(userId)) {
      return <IoHeartSharp />;
    }
  };

  const handleTabs = (key: React.Key) => {
    setSelectedCategory(key as string);
  };

  const allProducts = data?.pages?.flatMap((page) => page.data.results) ?? [];

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="sticky top-[64px] z-20 py-1 mb-3 overflow-x-scroll scrollbar-hide border-b bg-background/70 backdrop-blur-lg backdrop-saturate-150 border-divider">
        <Tabs
          variant="underlined"
          onSelectionChange={handleTabs}
          size="lg"
          color="primary"
        >
          <Tab title="전체" key="" />
          {category?.data?.map((category: any) => (
            <Tab
              key={category._id}
              title={category.category}
              value={category._id}
            />
          ))}
        </Tabs>
      </div>

      <div className="flex items-center gap-2 text-medium sm:text-xl extra-bold m-1">
        {!isLoading && (
          <>
            <CiShoppingTag />
            {data?.pages[0]?.data?.counts + "개의 상품 목록"}
          </>
        )}
      </div>

      {isLoading && allProducts.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="sm:max-w-full mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs md:text-sm p-1">
          {allProducts.map((product: PostData) => (
            <div
              key={product._id}
              className="flex flex-col gap-2 max-w-[200px] md:max-w-[300px] text-sm text-gray-800 cursor-pointer mx-auto hover:animate-hover-up hover:shadow-md rounded-md"
              onClick={() => handleRouteProductDetail(product._id)}
            >
              <Image
                src={product.product.thumbnail}
                alt={product.title}
                width={300}
                height={300}
                className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-md object-contain bg-gray-100"
              />
              <div className="px-2 pb-2">
                <p className="text-xs sm:text-sm line-clamp-1">
                  {product.title}
                </p>
                <div className="flex justify-between items-center">
                  <p className="bold text-xs sm:text-sm">
                    {formatPrice(product.product.price)}
                  </p>
                  <div className="flex gap-1 text-lg text-red-500">
                    {FavoriteShow(product.like_user_list)}
                  </div>
                </div>
                <div className="flex gap-2 text-xs text-gray-400 light h-[16px]">
                  {product.like_count !== 0 && (
                    <p>좋아요 {product.like_count}</p>
                  )}
                  {product.comment_list.length !== 0 && (
                    <p>상품평 {product.comment_list.length}</p>
                  )}
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
};

export default Products;
