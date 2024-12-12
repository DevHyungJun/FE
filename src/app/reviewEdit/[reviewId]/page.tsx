"use client";

import useDetail from "@/hooks/useDetail";
import { Button, Image, Input, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { Rate } from "antd";
import { useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useQueryClient } from "@tanstack/react-query";
import useGetSingleReview from "@/hooks/useGetSingleReview";
import { useForm } from "react-hook-form";
import useAditReview from "@/hooks/useAditReview";

type ParamsreviewId = {
  reviewId: string;
};

type ReviewEditForm = {
  title: string;
  content: string;
};

interface ImageFile {
  file: File;
  url: string;
  id: number;
}

export default function ReviewEdit({ params }: { params: ParamsreviewId }) {
  const { reviewId } = params; // 리뷰 하나의 고유한 id
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: reviewData, isLoading: reviewIsLoading } =
    useGetSingleReview(reviewId);
  const { data, isLoading, isError, error } = useDetail(
    reviewData?.data?.article,
    !!reviewData?.data?.article
  );
  const item = data?.data;
  const [rate, setRate] = useState<number>(0);
  const [images, setImages] = useState<ImageFile[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm<ReviewEditForm>();
  const { mutate: aditReview, isPending: aditReviewIsPending } =
    useAditReview(reviewId);

  const initializeImages = async (imageUrls: string[]) => {
    setImages([]);

    const newImages = await Promise.all(
      imageUrls.map(async (url) => {
        const response = await fetch(url, { mode: "no-cors" });
        const blob = await response.blob();
        const file = new File([blob], "image.jpg", { type: blob.type });
        return {
          file: file,
          url: url,
          id: Date.now() + Math.random(),
        };
      })
    );

    setImages(newImages);
  };

  useEffect(() => {
    if (reviewData?.data) {
      setRate(reviewData.data.rate);
      setValue("title", reviewData.data.title);
      setValue("content", reviewData.data.content);
      initializeImages(reviewData.data.images);
    }
  }, [reviewData]);

  const handleAddImagesClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const arrayFiles = Array.from(files);
      const newFiles = arrayFiles.map((file, index) => ({
        file,
        url: URL.createObjectURL(file),
        id: Date.now() + index,
      }));
      setImages((prevImages) => [...prevImages, ...newFiles]);
    }
  };

  const handleImageDelete = (id: number) => {
    setImages((prevImages) => prevImages.filter((_image) => _image.id !== id));
  };

  const onSubmit = (formData: ReviewEditForm) => {
    if (images.length === 0 || !formData.title || !formData.content || !rate) {
      Swal.fire({
        icon: "error",
        title: "모든 항목을 입력해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (!isDirty) {
      Swal.fire({
        icon: "error",
        title: "수정된 내용이 없습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("rate", rate.toString());
    const areImagesEqual =
      reviewData.data.images.length === images.length &&
      reviewData.data.images.every(
        (url: string, index: number) => url === images[index].url
      );
    if (!areImagesEqual) {
      images.forEach((image) => {
        form.append("images", image.file);
      });
    }

    aditReview(form as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["reviews"],
        });
        router.back();
      },
    });
  };

  return (
    <div className="p-1 max-w-[800px] mx-auto">
      <h1 className="text-xl p-3">
        <span className="font-semibold">{item?.product?.product_name} </span>
        상품평 수정하기
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

      {reviewIsLoading ? (
        <LoadingSpinner mode="1" />
      ) : (
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="상품평 제목"
            variant="bordered"
            placeholder="상품평의 제목을 입력하세요."
            {...register("title")}
          />
          <Textarea
            label="상품평 본문"
            placeholder="상품평의 본문을 입력하세요."
            variant="bordered"
            maxRows={10}
            {...register("content")}
          />
          <input
            type="file"
            ref={fileInputRef}
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            multiple
            className="hidden"
          />
          <Button
            className="w-full"
            variant="bordered"
            onClick={handleAddImagesClick}
          >
            상품평 이미지 추가
          </Button>
          {images.map((image) => (
            <div
              key={image.id}
              className="flex justify-center relative mx-auto"
            >
              <Image
                src={image.url}
                alt="Preview image"
                className="object-cover"
                width={500}
                height={500}
              />
              <button
                type="button"
                onClick={() => handleImageDelete(image.id)}
                className="absolute top-1 right-1 p-[1px] bg-white rounded-full z-10 text-2xl text-red-500 hover:text-red-700"
              >
                <MdCancel />
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
            className="w-full"
            color="success"
            type="submit"
            isLoading={aditReviewIsPending}
          >
            상품평 수정
          </Button>
        </form>
      )}
    </div>
  );
}
