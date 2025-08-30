import useDeleteCategory from "@/hooks/useDeleteCategory";
import useGetCategory from "@/hooks/useGetCategory";
import usePostCategory from "@/hooks/usePostCategory";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

const useCategory = () => {
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState<string>("");
  const { data: category, isLoading: getCategoryIsLoaing } = useGetCategory();
  const { mutate: postCategory, isPending: postCategoryIspending } =
    usePostCategory();
  const { mutate: deleteCategory, isPending: deleteCategoryIspending } =
    useDeleteCategory();

  const handlePostCategory = () => {
    if (categoryName === "") {
      Swal.fire({
        icon: "error",
        title: "카테고리 이름을 입력해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    postCategory(
      { category_name: categoryName },
      {
        onSuccess: () => {
          setCategoryName("");
          queryClient.invalidateQueries({ queryKey: ["category"] });
        },
      }
    );
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory(categoryId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["category"] });
      },
    });
  };

  return {
    state: {
      categoryName,
      setCategoryName,
    },
    category,
    loading: {
      getCategoryIsLoaing,
      postCategoryIspending,
      deleteCategoryIspending,
    },
    actions: {
      handlePostCategory,
      handleDeleteCategory,
    },
  };
};

export default useCategory;
