import favoriteDelete from "@/api/favoriteDelete";
import { useMutation } from "@tanstack/react-query";

export default function useFavoriteDelete() {
  return useMutation({
    mutationFn: (id: string)=> favoriteDelete(id),
  });
};
