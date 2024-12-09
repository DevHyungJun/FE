import singleOrderGet from "@/api/singleOrderGet";
import { useQuery } from "@tanstack/react-query";

export default function useSingleOrderGet(id: string) {
  return useQuery({
    queryKey: ['singleOrderGet', id],
    queryFn: ()=>singleOrderGet(id),
  });
};