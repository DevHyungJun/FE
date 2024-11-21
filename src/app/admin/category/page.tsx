'use client';

import useGetCategory from "@/hooks/useGetCategory";
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useState } from "react";
import Swal from "sweetalert2";
import usePostCategory from "@/hooks/usePostCategory";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteCategory from "@/hooks/useDeleteCategory";

export default function Category() {
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState<string>('');
  const { data: category } = useGetCategory();
  const { mutate: postCategory, isPending: postCategoryIspending } = usePostCategory();
  const { mutate: deleteCategory, isPending: deleteCategoryIspending } = useDeleteCategory();

  const handlePostCategory = () => {
    if(categoryName === '') {
      Swal.fire({
        icon: 'error',
        title: '카테고리 이름을 입력해주세요',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    postCategory({category_name: categoryName}, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: '카테고리 등록 성공',
          showConfirmButton: false,
          timer: 1500,
        });
        setCategoryName('');
        queryClient.invalidateQueries({queryKey: ['category']});
      }
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory(categoryId, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: '카테고리 삭제 성공',
          showConfirmButton: false,
          timer: 1500,
        });
        queryClient.invalidateQueries({queryKey: ['category']});
      }
    });
  };

  return (
    <div className="p-1 max-w-[800px] mx-auto">
      <h1>카테고리 관리</h1>
      <div className="flex flex-col items-end gap-2">
        <Input
          label="카테고리 이름"
          name="category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button
          type="button"
          className="w-1/2"
          onClick={handlePostCategory}
          isLoading={postCategoryIspending}
        >카테고리 등록</Button>
      </div>
      
      <div className="flex flex-col gap-2 mt-10 border-2 rounded-lg">
        {category?.data?.map((category: any) => (
          <div key={category._id} className="flex justify-between items-center p-3 border-b">
            <span className="font-semibold">{category.category}</span>
            <Button 
              className="hover:font-semibold" 
              color="danger" 
              variant="bordered" 
              onClick={()=> handleDeleteCategory(category._id)}
              isLoading={deleteCategoryIspending}
              size="sm"
            >
              삭제
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}