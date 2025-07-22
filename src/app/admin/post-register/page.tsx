"use client";

import { Input, Button } from "@nextui-org/react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ImagePreview from "./components/PostImagePreview";
import CategoryRegister from "./components/CategoryRegister";
import ProductSelect from "./components/ProductSelect";
import CategorySelect from "./components/CategorySelect";
import ThumbnailUploadPreview from "./components/ProductPreview";
import useGuestOut from "@/hooks/useGuestOut";
import usePostRegisterForm from "./hooks/usePostRegisterForm";
import usePreviewEffect from "../hooks/usePreviewEffect";

export default function PostRegister() {
  useGuestOut(true);
  const {
    isLoading,
    items,
    categoryItems,
    selectedProduct,
    selectedCategory,
    images,
    previews,
    setPreviews,
    fileInputRef,
    titleRef,
    categoryShow,
    setCategoryShow,
    categoryName,
    setCategoryName,
    postCategoryPending,
    handleSubmit,
    handleImageChange,
    handleImageDelete,
    handleAddImagesClick,
    handleSelectChange,
    handleCategoryChange,
    handlePostCategory,
  } = usePostRegisterForm();
  usePreviewEffect(images, setPreviews);
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
            <ProductSelect
              items={items}
              selectedProduct={selectedProduct}
              onChange={handleSelectChange}
            />
            <CategorySelect
              items={categoryItems}
              selectedCategory={selectedCategory}
              onChange={handleCategoryChange}
            />
            <CategoryRegister
              categoryShow={categoryShow}
              categoryName={categoryName}
              onNameChange={(e) => setCategoryName(e.target.value)}
              onRegister={handlePostCategory}
              isLoading={postCategoryPending}
              onToggle={() => setCategoryShow((prev) => !prev)}
            />
            <ThumbnailUploadPreview
              imageUrl={
                items.find((item) => item._id === selectedProduct)?.thumbnail
              }
              label={
                items.find((item) => item._id === selectedProduct)
                  ?.product_name || "미리보기 이미지"
              }
              alt={selectedProduct}
              fileInputRef={fileInputRef}
              onImageChange={handleImageChange}
            />
            <Button
              type="button"
              color="default"
              onClick={handleAddImagesClick}
              className={`bold ${
                selectedProduct
                  ? ""
                  : "cursor-not-allowed bg-gray-100 text-gray-300"
              }`}
              disabled={!selectedProduct}
            >
              제품 상세 이미지 추가
            </Button>
            <ImagePreview previews={previews} onDelete={handleImageDelete} />
            <Button color="primary" onClick={handleSubmit} className="bold">
              등록
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
