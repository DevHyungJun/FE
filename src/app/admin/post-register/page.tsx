"use client";

import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import useGetItem from "@/hooks/useGetItem";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useNewPost from "@/hooks/useNewPost";
import Swal from "sweetalert2";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Product } from "../../../../types/Product";
import useGetCategory from "@/hooks/useGetCategory";
import usePostCategory from "@/hooks/usePostCategory";
import { useQueryClient } from "@tanstack/react-query";

interface CategoryItems {
  _id: string;
  category: string;
  user: string;
  __v: number;
}

export default function PostRegister() {
  const { data, isLoading, isError, error } = useGetItem(1);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const newPost = useNewPost();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: categroy } = useGetCategory();
  const { mutate: postCategory, isPending: postCategoryPending } =
    usePostCategory();
  const [categoryShow, setCategoryShow] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const items = data?.data;
  const categoryItems = categroy?.data;

  useEffect(() => {
    // 이미지 미리보기 URL 생성
    const objectUrls = images.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    // 컴포넌트 언마운트 시 URL 해제
    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("title", titleRef.current?.value || "");
    images.forEach((image) => formData.append("detail_images", image));
    formData.append("product", selectedProduct);
    formData.append("category", selectedCategory);

    if (
      !titleRef.current?.value ||
      !selectedProduct ||
      !selectedCategory ||
      images.length === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "모든 항목을 입력해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    newPost.mutate(formData as any, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "상품 등록 성공",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/products");
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleAddImagesClick = () => fileInputRef.current?.click();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedProduct(e.target.value);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedCategory(e.target.value);

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
          Swal.fire({
            icon: "success",
            title: "카테고리 등록 성공",
            showConfirmButton: false,
            timer: 1500,
          });
          setCategoryShow(false);
          setCategoryName("");
          queryClient.invalidateQueries({ queryKey: ["category"] });
        },
      }
    );
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="p-1 max-w-[800px] mx-auto">
          <h1 className="flex items-center gap-2 text-2xl extra-bold my-5">
            게시글 등록
          </h1>
          <form className="flex flex-col gap-3">
            <Input label="게시글 제목" name="title" ref={titleRef} />
            <Select
              items={items}
              label="상품"
              placeholder="상품을 선택하세요"
              onChange={handleSelectChange}
              selectedKeys={selectedProduct ? [selectedProduct] : []}
            >
              {items?.map((item: Product) => (
                <SelectItem
                  key={item._id}
                  value={item._id}
                  textValue={item.product_name}
                >
                  {item.product_name}
                </SelectItem>
              ))}
            </Select>
            <Select
              items={categoryItems}
              label="카테고리"
              placeholder="카테고리를 선택하세요"
              onChange={handleCategoryChange}
              selectedKeys={selectedCategory ? [selectedCategory] : []}
            >
              {categoryItems?.map((item: CategoryItems) => (
                <SelectItem
                  key={item._id}
                  value={item._id}
                  textValue={item.category}
                >
                  {item.category}
                </SelectItem>
              ))}
            </Select>
            <button
              type="button"
              onClick={() => setCategoryShow((prev) => !prev)}
            >
              <p className="text-sm hover:text-blue-500 bold">
                원하는 카테고리가 없다면? 등록하기
              </p>
            </button>
            {categoryShow && (
              <div className="flex flex-col items-end gap-2">
                <Input
                  label="카테고리 이름"
                  name="category"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <Button
                  type="button"
                  className="w-1/2 bold"
                  onClick={handlePostCategory}
                  isLoading={postCategoryPending}
                >
                  카테고리 등록
                </Button>
              </div>
            )}
            {selectedProduct && (
              <div>
                <p className="light text-center">
                  선택한{" "}
                  {
                    items.find((item: Product) => item._id === selectedProduct)
                      ?.product_name
                  }{" "}
                  상품의 미리보기 이미지
                </p>
                <Image
                  src={
                    items.find((item: Product) => item._id === selectedProduct)
                      ?.thumbnail
                  }
                  alt={selectedProduct}
                  width={500}
                  height={500}
                  className="mx-auto"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </div>
            )}
            <Button
              type="button"
              color="success"
              onClick={handleAddImagesClick}
              className="bold"
            >
              제품 상세 이미지 추가
            </Button>
            <div className="flex flex-wrap gap-2 mt-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative mx-auto">
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="object-cover"
                    width={500}
                    height={500}
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(index)}
                    className="absolute top-1 right-1 p-[1px] bg-white rounded-full"
                  >
                    <MdCancel className="text-2xl" />
                  </button>
                </div>
              ))}
            </div>
            <Button
              color="primary"
              onClick={handleSubmit}
              isLoading={newPost.isPending}
              className="bold"
            >
              등록
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
