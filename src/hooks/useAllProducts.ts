import allProducts from "@/api/allProducts";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { ProductPostResponse } from "@/types/allProducts";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

export default function useAllProducts(
  category: string = "",
  limit: number = 10
): UseInfiniteQueryResult<ProductPostResponse, Error> {
  return useInfiniteQuery<
    ProductPostResponse,
    Error,
    ProductPostResponse,
    [string, string, number],
    number
  >({
    queryKey: ["allProducts", category, limit],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      allProducts(pageParam, category, limit),
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage?.data?.next;
      if (typeof nextUrl === "string") {
        try {
          const url = new URL(nextUrl);
          const pageParam = url.searchParams.get("page");
          return pageParam ? Number(pageParam) : null;
        } catch {
          return null;
        }
      }
      return null;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
    placeholderData: keepPreviousData,
  });
}
