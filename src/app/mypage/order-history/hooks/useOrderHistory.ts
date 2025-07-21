import useGetPayment from "@/hooks/useGetPayment";
import { useMemo } from "react";

export const useOrderHistory = () => {
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPayment();

  const orders = useMemo(() => {
    return ordersData?.pages.flatMap((page) => page.data.results) || [];
  }, [ordersData]);

  const handleNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const isEmpty = !isOrdersLoading && orders.length === 0;

  return {
    orders,
    isOrdersLoading,
    isEmpty,
    hasNextPage,
    isFetchingNextPage,
    handleNextPage,
  };
};
