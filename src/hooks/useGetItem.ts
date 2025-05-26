import getItem from "@/api/getItem";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

export default function useGetItem() {
  return useInfiniteQuery({
    queryKey: ["getItem"],
    queryFn: ({ pageParam = 1 }) => getItem(pageParam),
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
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    placeholderData: keepPreviousData,
  });
}
