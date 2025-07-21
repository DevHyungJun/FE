"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ReviewItem from "@/app/components/ReviewItem";
import ReviewOrderSelect from "@/app/components/review/ReviewOrderSelect";

interface ProductReviewTabProps {
  id: string;
  reviewData: any;
  reviewLoading: boolean;
  orderOption: string;
  setOrderOption: (value: string) => void;
  authCheckData: any;
}

export default function ProductReviewTab({
  id,
  reviewData,
  reviewLoading,
  orderOption,
  setOrderOption,
  authCheckData,
}: ProductReviewTabProps) {
  return (
    <>
      <Link
        href={authCheckData ? `/review/${id}` : "/login"}
        className="border-t py-3"
      >
        <Button variant="flat" className="w-full bold">
          상품평 작성하러 가기
        </Button>
      </Link>
      {reviewLoading ? (
        <LoadingSpinner mode="1" />
      ) : (
        <>
          <ReviewOrderSelect
            orderOption={orderOption}
            setOrderOption={setOrderOption}
            userReview={reviewData}
          />
          {reviewData?.data?.map((reviewItem: any) => (
            <ReviewItem key={reviewItem._id} review={reviewItem} />
          ))}
        </>
      )}
      {reviewData?.data?.length === 0 && !reviewLoading && (
        <p className="text-center text-gray-500 py-10 bold">
          등록된 상품평이 없습니다.
        </p>
      )}
    </>
  );
}
