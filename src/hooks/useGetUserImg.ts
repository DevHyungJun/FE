import getUserImg from "@/api/getUserImg";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserImg() {
  return useQuery({
    queryKey: ["userImg"],
    queryFn: getUserImg,
  });
}
