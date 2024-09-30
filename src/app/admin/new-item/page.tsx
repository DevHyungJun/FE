'use client';

import { Input, Button } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import useNewItem from "@/hooks/useNewItem";
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function NewItem() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const newItem = useNewItem();
  const router = useRouter();

  useEffect(() => {
    // 이미지 미리보기 URL 생성
    const objectUrls = images.map(file => URL.createObjectURL(file));
    setPreviews(objectUrls);

    // 컴포넌트 언마운트 시 URL 해제
    return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
  }, [images]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('product_name', e.currentTarget.product_name.value);
    formData.append('price', e.currentTarget.price.value);
    formData.append('stock_quantity', e.currentTarget.stock_quantity.value);
    images.forEach((image, index) => {
      formData.append('images', image);
      if (index === 0) {
        formData.append('thumbnail', image);
      }
    });
    newItem.mutate(formData as any, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: '상품 등록 성공',
          showConfirmButton: false,
          timer: 1500,
        });
        router.push('/admin/item-list');
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(prevImages => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleImageDelete = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleAddImagesClick = () => fileInputRef.current?.click();

  return (
    <div>
      <form className="flex flex-col gap-3 max-w-[800px] mx-auto"
        onSubmit={handleSubmit}>
        <h1>신규 상품 등록</h1>

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
        <Button type="button" color="success" onClick={handleAddImagesClick}>
          이미지 추가
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
        <Button type="submit" color="primary">
          상품 등록
        </Button>
      </form>
    </div>
  )
}