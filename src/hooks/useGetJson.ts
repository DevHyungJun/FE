import getJson from "@/api/getJson";
import { useQuery } from "@tanstack/react-query";

export default function useGetJson() {
  return useQuery({
    queryKey: ["json"],
    queryFn: getJson,
  });
}
