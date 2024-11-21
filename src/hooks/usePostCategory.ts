import postCategory from "@/api/postCategory";
import { useMutation } from "@tanstack/react-query";

type Category = {
  category_name: string;
};

export default function usePostCategory() {
  return useMutation({
    mutationFn: (data: Category)=> postCategory(data),
  });
}