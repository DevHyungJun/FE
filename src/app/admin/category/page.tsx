"use client";

import { Button, Input } from "@nextui-org/react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import useGuestOut from "@/hooks/useGuestOut";
import { CategoryItem } from "@/types/category";
import useCategory from "./hooks/useCategory";

export default function Category() {
  useGuestOut(true);
  const { state, category, loading, actions } = useCategory();
  const { categoryName, setCategoryName } = state;
  const {
    getCategoryIsLoaing,
    postCategoryIspending,
    deleteCategoryIspending,
  } = loading;
  const { handlePostCategory, handleDeleteCategory } = actions;

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
          className="w-full bold"
          onClick={handlePostCategory}
          color="primary"
          isLoading={postCategoryIspending}
        >
          카테고리 등록
        </Button>
      </div>

      {getCategoryIsLoaing ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col gap-2 mt-10 border-2 rounded-lg">
          {category?.data?.map((category: CategoryItem) => (
            <div
              key={category._id}
              className="flex justify-between items-center p-3 border-b"
            >
              <span className="bold">{category.category}</span>
              <Button
                className="hover:font-semibold light"
                color="danger"
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
