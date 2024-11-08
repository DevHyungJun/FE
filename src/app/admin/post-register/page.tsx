'use client';

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

export default function PostRegister() {
  const { data, isLoading, isError, error } = useGetItem(1);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const newPost = useNewPost();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const items = data?.data;

  useEffect(() => {
    // 이미지 미리보기 URL 생성
    const objectUrls = images.map(file => URL.createObjectURL(file));
    setPreviews(objectUrls);

    // 컴포넌트 언마운트 시 URL 해제
    return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
  }, [images]);

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('title', titleRef.current?.value || '');
    images.forEach((image) => formData.append('detail_images', image));
    formData.append('product', selectedProduct);
    newPost.mutate(formData as any, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: '상품 등록 성공',
          showConfirmButton: false,
          timer: 1500,
        });
        router.push('/products');
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedProduct(e.target.value);

  return (
    <>
      {isLoading ? <LoadingSpinner /> : (
        <div className="p-1 max-w-[800px] mx-auto">
          <h1>게시글 등록 페이지</h1>
          <form className="flex flex-col gap-3">
            <Input
              label="게시글 제목"
              name="title"
              ref={titleRef}
            />
            <Select
              items={items}
              label='상품'
              placeholder='상품을 선택하세요'
              onChange={handleSelectChange}
            >
              {items?.map((item: Product) => (
                <SelectItem
                  key={item._id}
                  value={item._id}
                >
                  {item.product_name}
                </SelectItem>
              ))}
            </Select>
            {selectedProduct && (
              <div>
                <p>
                  선택한 {items.find((item: Product) => item._id === selectedProduct)?.product_name} 상품의 미리보기 이미지
                </p>
                <Image
                  src={items.find((item: Product) => item._id === selectedProduct)?.thumbnail}
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
            <Button type="button" color="success" onClick={handleAddImagesClick}>
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
            >등록</Button>
          </form>
        </div>
      )}
    </>
  )
};