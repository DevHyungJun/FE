"use client";

import { Tabs, Tab } from "@nextui-org/react";
import useAllProducts from "@/hooks/useAllProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { PostData } from "@/types/Product";
import { useInView } from "react-intersection-observer";
import { CiShoppingTag } from "react-icons/ci";
import useGetCategory from "@/hooks/useGetCategory";
import ScrollUpButton from "../components/ScrollUpButton";
import { InfiniteProductPostResponse } from "@/types/allProducts";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { CategoryItem } from "@/types/category";

const Products = () => {
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

  const handleTabs = (key: React.Key) => setSelectedCategory(key as string);

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
          {category?.data?.map((category: CategoryItem) => (
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
            <ProductCard key={product?._id} product={product} mode="fluid" />
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
