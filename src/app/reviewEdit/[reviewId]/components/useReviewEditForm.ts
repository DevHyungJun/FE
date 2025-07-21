import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import useAditReview from "@/hooks/useAditReview";
import { SingleReview } from "@/types/review";

type ReviewEditFormValues = {
  title: string;
  content: string;
};

interface ImageFile {
  file: File;
  url: string;
  id: number;
}

export const useReviewEditForm = (
  reviewId: string,
  reviewData: SingleReview | undefined
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rate, setRate] = useState<number>(0);
  const [images, setImages] = useState<ImageFile[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue } = useForm<ReviewEditFormValues>();
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
    if (reviewData) {
      setRate(reviewData.rate);
      setValue("title", reviewData.title);
      setValue("content", reviewData.content);
      initializeImages(reviewData.images);
    }
  }, [reviewData, setValue]);

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

  const onSubmit = (formData: ReviewEditFormValues) => {
    if (!reviewData) return;

    if (images.length === 0 || !formData.title || !formData.content || !rate) {
      Swal.fire({
        icon: "error",
        title: "모든 항목을 입력해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const isTitleChanged = reviewData.title !== formData.title;
    const isContentChanged = reviewData.content !== formData.content;
    const isRateChanged = rate !== reviewData.rate;
    const areImagesEqual =
      reviewData.images.length === images.length &&
      reviewData.images.every(
        (url: string, index: number) => url === images[index].url
      );

    if (
      !isTitleChanged &&
      !isContentChanged &&
      !isRateChanged &&
      areImagesEqual
    ) {
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

    if (!areImagesEqual) {
      images.forEach((image) => {
        form.append("images", image.file);
      });
    }

    aditReview(form as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reviews"] });
        router.back();
      },
    });
  };

  return {
    form: {
      register,
      handleSubmit: handleSubmit(onSubmit),
    },
    state: {
      rate,
      setRate,
      images,
      aditReviewIsPending,
      fileInputRef,
    },
    actions: {
      handleAddImagesClick,
      handleImageChange,
      handleImageDelete,
    },
  };
};
