import favoritePost from "@/api/favoritePost";
import { useMutation } from "@tanstack/react-query";

export default function useFavoritePost() {
  return useMutation({
    mutationFn: (id: string)=> favoritePost(id),
  });
};