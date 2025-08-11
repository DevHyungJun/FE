import { useMutation } from "@tanstack/react-query";
import newItem from "@/api/newItem";

export default function useNewItem() {
  return useMutation({
    mutationFn: (formData: FormData) => newItem(formData),
  });
}
