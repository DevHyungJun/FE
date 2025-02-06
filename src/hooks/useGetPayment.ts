import getPayment from "@/api/getPayment";
import { useQuery } from "@tanstack/react-query";

export default function useGetPayment(page: number) {
  return useQuery({
    queryKey: ["getPayment", page],
    queryFn: () => getPayment(page),
    enabled: !!page,
  });
}
