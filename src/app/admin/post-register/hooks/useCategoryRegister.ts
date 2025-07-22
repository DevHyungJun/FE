import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import usePostCategory from "@/hooks/usePostCategory";
import { ERROR_CATEGORY_NAME_REQUIRED } from "@/constants/postRegisterForm";

export function useCategoryRegister() {
  const [categoryShow, setCategoryShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const queryClient = useQueryClient();
  const { mutate: postCategory, isPending } = usePostCategory();

  const handlePostCategory = (onError?: (msg: string) => void) => {
    if (categoryName === "") {
      if (onError) onError(ERROR_CATEGORY_NAME_REQUIRED);
      return;
    }
    postCategory(
      { category_name: categoryName },
      {
        onSuccess: () => {
          setCategoryShow(false);
          setCategoryName("");
          queryClient.invalidateQueries({ queryKey: ["category"] });
        },
      }
    );
  };

  return {
    categoryShow,
    setCategoryShow,
    categoryName,
    setCategoryName,
    isPending,
    handlePostCategory,
  };
}
