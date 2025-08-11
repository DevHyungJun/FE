"use client";

import useGetUserReview from "@/hooks/useGetUserReview";
import useAuthCheck from "@/hooks/useAuthCheck";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ReviewItem from "@/app/components/ReviewItem";
import { useState } from "react";
import useGuestOut from "@/hooks/useGuestOut";
import ReviewOrderSelect from "@/app/components/review/ReviewOrderSelect";
import { ReviewData } from "@/types/review";

export default function MpReview() {
  const { data: userInfo } = useAuthCheck();
  const userId = userInfo?.data?.userId;
  const [orderOption, setOrderOption] = useState("updatedAt");
  useGuestOut();
  const { data: userReview, isLoading } = useGetUserReview(
    userId,
    orderOption,
    !!userId
  );

  return (
    <div className="mx-auto max-w-[800px] text-gray-800">
      <div className="w-full p-5 bg-white rounded-md">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl extra-bold my-5">상품평 관리</h1>
        </div>

        {isLoading ? (
          <LoadingSpinner mode="1" />
        ) : (
          <>
            <ReviewOrderSelect
              orderOption={orderOption}
              setOrderOption={setOrderOption}
              userReview={userReview}
            />
            {userReview?.data?.map((reviewItem: ReviewData) => (
              <ReviewItem
                key={reviewItem._id}
                review={reviewItem}
                myPage={true}
              />
            ))}
          </>
        )}
        {userReview?.data?.length === 0 && (
          <p className="text-center text-gray-500 bold py-10">
            등록된 상품평이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
