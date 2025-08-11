"use client";

import { Input, Button } from "@nextui-org/react";
import { useState, useRef } from "react";
import useNewItem from "@/hooks/useNewItem";
import { useRouter } from "next/navigation";
import useGuestOut from "@/hooks/useGuestOut";
import ThumbnailUploadPreview from "../post-register/components/ProductPreview";
import usePreviewEffect from "../hooks/usePreviewEffect";
import ImagePreviewList from "@/app/components/common/ImagePreviewList";

export default function NewItem() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const newItem = useNewItem();
  const router = useRouter();
  useGuestOut(true);
  usePreviewEffect(images, setPreviews);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("product_name", e.currentTarget.product_name.value);
    formData.append("price", e.currentTarget.price.value);
    formData.append("stock_quantity", e.currentTarget.stock_quantity.value);
    images.forEach((image, index) => {
      formData.append("images", image);
      if (index === 0) {
        formData.append("thumbnail", image);
      }
    });
    newItem.mutate(formData as FormData, {
      onSuccess: () => {
        router.push("/admin/item-list");
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleImageDelete = (id: string | number) =>
    setImages((prevImages) => prevImages.filter((_, i) => i !== id));

  const handleAddImagesClick = () => fileInputRef.current?.click();

  return (
    <div className="p-1">
      <form
        className="flex flex-col gap-3 max-w-[800px] mx-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="flex items-center gap-2 text-2xl extra-bold my-5">
          신규 상품 등록
        </h1>

        <Input
          label="상품명"
          placeholder="상품명을 입력하세요"
          name="product_name"
        />
        <Input
          label="가격"
          type="number"
          placeholder="상품 가격을 입력하세요"
          name="price"
        />
        <Input
          label="수량"
          type="number"
          placeholder="상품 수량을 입력하세요"
          name="stock_quantity"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          multiple
          className="hidden"
        />
        <Button
          type="button"
          color="default"
          onClick={handleAddImagesClick}
          className="bold"
        >
          제품 썸네일 이미지 추가(여러 장 가능)
        </Button>
        <ThumbnailUploadPreview
          imageUrl={previews[0]}
          label="대표 이미지 미리보기"
          alt="thumbnail"
          fileInputRef={fileInputRef}
          onImageChange={handleImageChange}
        />
        <ImagePreviewList
          images={previews.map((url, idx) => ({ url, id: idx }))}
          onDelete={handleImageDelete}
          title="상세 이미지 미리보기"
        />
        <Button type="submit" color="primary" className="bold">
          상품 등록
        </Button>
      </form>
    </div>
  );
}
