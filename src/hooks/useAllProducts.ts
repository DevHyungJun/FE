import allProducts from "@/api/allProducts";
import { useQuery } from "@tanstack/react-query";

export default function useAllProducts(page: number, category: string='') {
  return useQuery({
    queryKey: ['allProducts', page, category],
    queryFn:()=> allProducts(page, category),
  });
};