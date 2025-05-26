"use client";

import useGetUserReview from "@/hooks/useGetUserReview";
import useAuthCheck from "@/hooks/useAuthCheck";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Select, SelectItem, user } from "@nextui-org/react";
import ReviewItem from "@/app/components/ReviewItem1";
import { useState } from "react";
import useGuestOut from "@/hooks/useGuestOut";

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

  const orderingOptions = [
    { label: "날짜순", value: "updatedAt" },
    { label: "추천순", value: "-likes" },
    { label: "별점순", value: "-rate" },
  ];

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
            <div
              className={`flex justify-end ${
                userReview?.data.length === 0 && "hidden"
              }`}
            >
              <Select
                items={orderingOptions}
                label="정렬"
                className="w-[100px] bold"
                variant="underlined"
                defaultSelectedKeys={["updatedAt"]}
                onChange={(e) => setOrderOption(e.target.value)}
              >
                {(item) => (
                  <SelectItem key={item.value} textValue={item.label}>
                    {item.label}
                  </SelectItem>
                )}
              </Select>
            </div>
            {userReview?.data?.map((reviewItem: any) => (
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
