import { useInfiniteQuery } from "@tanstack/react-query";
import getPayment from "@/api/getPayment";

export default function useGetPayment() {
  return useInfiniteQuery({
    queryKey: ["payment"],
    queryFn: ({ pageParam = 1 }) => getPayment(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.next) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
}
