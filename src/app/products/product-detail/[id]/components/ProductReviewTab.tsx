"use client";
import React from "react";
import Link from "next/link";
import { Button, Select, SelectItem } from "@nextui-org/react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ReviewItem from "@/app/components/ReviewItem1";
import { ORDERING_OPTIONS } from "@/constants/productDetail";

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
          <div className="flex justify-end">
            <Select
              aria-label="정렬"
              disallowEmptySelection
              items={ORDERING_OPTIONS}
              label="정렬"
              className="w-[100px] bold"
              variant="underlined"
              defaultSelectedKeys={["updatedAt"]}
              selectedKeys={[String(orderOption)]}
              onChange={(e) => setOrderOption(e.target.value)}
            >
              {(item) => (
                <SelectItem key={item.value} value={item.label}>
                  {item.label}
                </SelectItem>
              )}
            </Select>
          </div>
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
