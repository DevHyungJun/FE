"use client";

import useGetCategory from "@/hooks/useGetCategory";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import Swal from "sweetalert2";
import usePostCategory from "@/hooks/usePostCategory";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteCategory from "@/hooks/useDeleteCategory";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function Category() {
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState<string>("");
  const { data: category, isLoading } = useGetCategory();
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

  return (
    <div className="p-1 max-w-[800px] mx-auto">
      <h1 className="flex items-center gap-2 text-2xl extra-bold my-5">
        카테고리 관리
      </h1>
      <div className="flex flex-col items-end gap-2">
        <Input
          label="카테고리 이름"
          placeholder="추가할 카테고리 이름을 입력해주세요"
          name="category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button
          type="button"
          className="w-1/2 bold"
          onClick={handlePostCategory}
          color="primary"
          isLoading={postCategoryIspending}
        >
          카테고리 등록
        </Button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col gap-2 mt-10 border-2 rounded-lg">
          {category?.data?.map((category: any) => (
            <div
              key={category._id}
              className="flex justify-between items-center p-3 border-b"
            >
              <span className="bold">{category.category}</span>
              <Button
                className="hover:font-semibold light"
                color="danger"
                variant="bordered"
                onClick={() => handleDeleteCategory(category._id)}
                isLoading={deleteCategoryIspending}
                size="sm"
              >
                삭제
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
