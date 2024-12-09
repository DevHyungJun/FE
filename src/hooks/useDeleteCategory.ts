import deleteCategory from "@/api/deleteCategory";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteCategory() {
  return useMutation({
    mutationFn:(id: string)=> deleteCategory(id),
  });
}