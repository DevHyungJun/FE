"use client";

import { useReviewForm } from "./useReviewForm";
import { Button, Input, Textarea } from "@nextui-org/react";
import Rate from "@/app/components/Rate";
import ImagePreview from "@/app/components/review/ImagePreview";

interface ReviewFormProps {
  id: string;
}

const ReviewForm = ({ id }: ReviewFormProps) => {
  const { form, state, actions } = useReviewForm(id);

  return (
    <form onSubmit={form.handleSubmit} className="space-y-3">
      <Input
        label="상품평 제목"
        variant="bordered"
        placeholder="상품평의 제목을 입력하세요."
        {...form.register("title")}
      />
      <Textarea
        label="상품평 본문"
        placeholder="상품평의 본문을 입력하세요."
        variant="bordered"
        maxRows={10}
        {...form.register("content")}
      />
      <input
        type="file"
        ref={state.fileInputRef}
        onChange={actions.handleImageChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      <Button
        className="w-full bold"
        variant="bordered"
        onClick={actions.handleAddImagesClick}
      >
        상품평 이미지 추가
      </Button>
      <ImagePreview
        images={state.images}
        onDelete={actions.handleImageDelete}
      />
      <Rate value={state.rate} onChange={(value) => state.setRate(value)} />
      <Button
        className="w-full bold"
        color="primary"
        type="submit"
        isLoading={state.isPending}
      >
        상품평 등록
      </Button>
    </form>
  );
};

export default ReviewForm;
