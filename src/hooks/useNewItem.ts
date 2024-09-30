import { useMutation } from "@tanstack/react-query";
import newItem from "@/api/newItem";

type FormData = {
  product_name: string;
  price: string;
  stock_quantity: string;
  images: File;
  thumbnail: File;
}

export default function useNewItem() {
  return useMutation({
    mutationFn:(formData: FormData)=> newItem(formData)
  });
};