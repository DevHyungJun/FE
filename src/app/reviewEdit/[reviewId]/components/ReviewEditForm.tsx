"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import ImagePreview from "@/app/components/review/ImagePreview";
import Rate from "@/app/components/Rate";
import { useReviewEditForm } from "./useReviewEditForm";
import { ReviewData } from "@/types/review";

interface ReviewEditFormProps {
  reviewId: string;
  reviewData: ReviewData | undefined;
}

const ReviewEditForm = ({ reviewId, reviewData }: ReviewEditFormProps) => {
  const { form, state, actions } = useReviewEditForm(reviewId, reviewData);
  const { register, handleSubmit } = form;
  const { rate, setRate, images, aditReviewIsPending, fileInputRef } = state;
  const { handleAddImagesClick, handleImageChange, handleImageDelete } =
    actions;

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
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
        className="w-full bold"
        variant="bordered"
        onClick={handleAddImagesClick}
      >
        상품평 이미지 추가
      </Button>
      <ImagePreview images={images} onDelete={handleImageDelete} />
      <Rate value={rate} onChange={setRate} />
      <Button
        className="w-full bold"
        color="primary"
        type="submit"
        isLoading={aditReviewIsPending}
      >
        상품평 수정
      </Button>
    </form>
  );
};

export default ReviewEditForm;
