"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import usePostReview from "@/hooks/usePostReview";

type ReviewFormValues = {
  title: string;
  content: string;
};

interface ImageFile {
  file: File;
  url: string;
  id: number;
}

export const useReviewForm = (id: string) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rate, setRate] = useState<number>(0);
  const [images, setImages] = useState<ImageFile[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit, control } = useForm<ReviewFormValues>();
  const { mutate, isPending } = usePostReview(id);

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

  const onSubmit = (formData: ReviewFormValues) => {
    if (images.length === 0 || !formData.title || !formData.content || !rate) {
      Swal.fire({
        icon: "error",
        title: "모든 항목을 입력해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("rate", rate.toString());

    if (images.length > 0) {
      images.forEach((image) => {
        form.append("images", image.file);
      });
    }

    mutate(form as FormData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reviews", id] });
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

  useEffect(() => {
    const objectUrls = images.map((image) => image.url);
    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  return {
    form: {
      register,
      handleSubmit: handleSubmit(onSubmit),
      control,
    },
    state: {
      rate,
      setRate,
      images,
      isPending,
      fileInputRef,
    },
    actions: {
      handleAddImagesClick,
      handleImageChange,
      handleImageDelete,
    },
  };
};
