import allProducts from "@/api/allProducts";
import { useQuery } from "@tanstack/react-query";

export default function useAllProducts(page: number) {
  return useQuery({
    queryKey: ['allProducts', page],
    queryFn:()=> allProducts(page),
    staleTime: 0,
    gcTime: 0,
  });
};