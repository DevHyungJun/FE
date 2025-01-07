"use client";

import productDetail from "@/api/productDetail";
import { useQuery } from "@tanstack/react-query";

export default function useDetail(id: string, enabled = true) {
  return useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => productDetail(id),
    enabled,
  });
}
