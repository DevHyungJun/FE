"use client";

import useDetail from "@/hooks/useDetail";
import { Button, Image, Input, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { Rate } from "antd";
import { useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import usePostReview from "@/hooks/usePostReview";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner";

type ParamsId = { id: string };

export default function Review({ params }: { params: ParamsId }) {
  const { id } = params;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, isError, error } = useDetail(id);
  const item = data?.data;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [rate, setRate] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const { mutate, isPending } = usePostReview(id);
  const router = useRouter();

  useEffect(() => {
    const objectUrls = images.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  const handleAddImagesClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handlePostReview = () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    if (images.length > 0) {
      images.forEach((image) => formData.append("images", image));
    }
    formData.append("rate", rate.toString());

    if (!title || !content || !rate) {
      Swal.fire({
        icon: "error",
        title: "모든 항목을 입력해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    mutate(formData as any, {
      onSuccess: () => {
        router.back();
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "상품평 등록에 실패했습니다",
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  };

  return (
    <div className="p-1 max-w-[800px] mx-auto">
      <h1 className="text-xl p-3">
        <span className="extra-bold">{item?.product?.product_name} </span>
        상품평 작성하기
      </h1>
      {isLoading ? (
        <LoadingSpinner mode="1" />
      ) : (
        <div className="flex-grow p-3 rounded-sm">
          <div className="flex gap-3">
            <Link href={`/products/product-detail/${item?._id}`}>
              <Image
                width={100}
                alt="product image"
                src={item?.product?.thumbnail}
                className="rounded-md object-contain bg-gray-100"
              />
            </Link>
            <Link
              href={`/products/product-detail/${item?._id}`}
              className="flex items-center hover:font-semibold"
            >
              <p className="text-xs md:text-sm">
                {item?.product?.product_name}
              </p>
            </Link>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Input
          label="상품평 제목"
          name="title"
          variant="bordered"
          placeholder="상품평의 제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          label="상품평 본문"
          placeholder="상품평의 본문을 입력하세요."
          variant="bordered"
          maxRows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
          className="w-full bold"
          variant="bordered"
          onClick={handleAddImagesClick}
        >
          상품평 이미지 추가
        </Button>
        {previews.map((preview, index) => (
          <div key={index} className="flex justify-center relative mx-auto">
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
        {!isLoading && (
          <Rate
            value={rate}
            onChange={(value) => setRate(value)}
            style={{
              fontSize: "32px",
              textAlign: "right",
              width: "100%",
            }}
          />
        )}
        <Button
          className="w-full bold"
          color="primary"
          onClick={handlePostReview}
          isLoading={isPending}
        >
          상품평 등록
        </Button>
      </div>
    </div>
  );
}
