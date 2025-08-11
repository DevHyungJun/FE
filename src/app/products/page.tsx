"use client";

import useAllProducts from "@/hooks/useAllProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { PostData } from "@/types/Product";
import { useInView } from "react-intersection-observer";
import ScrollUpButton from "../components/ScrollUpButton";
import { InfiniteProductPostResponse } from "@/types/allProducts";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import CategoryTab from "../components/CategoryTab";
import ProductListHead from "../components/ProductListHead";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
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

  const allProducts = data?.pages?.flatMap((page) => page.data.results) ?? [];

  return (
    <div className="max-w-[1200px] mx-auto">
      <CategoryTab setSelectedCategory={setSelectedCategory} />
      <ProductListHead isLoading={isLoading} data={data} />

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
