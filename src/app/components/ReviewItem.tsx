"use client";

import { useQueryClient } from "@tanstack/react-query";
import MyPageReviewHeader from "./review/MyPageReviewHeader";
import ReviewHeader from "./review/ReviewHeader";
import ReviewImage from "./review/ReviewImage";
import ReviewLikeButton from "./review/ReviewLikeButton";
import ReviewMenu from "./review/ReviewMenu";

interface UserId {
  data: {
    userId: string;
  };
}

interface Review {
  _id: string;
  user: string;
  article: string;
  title: string;
  content: string;
  rate: number;
  images: string[];
  likes: number;
  likedBy: string[];
  updatedAt: string;
}

interface ReviewItemProps {
  review: Review;
  myPage?: boolean;
}

export default function ReviewItem({
  review,
  myPage = false,
}: ReviewItemProps) {
  const queryClient = useQueryClient();
  const catchedUserId = queryClient.getQueryData<UserId>(["authCheck"]);

  const isAuthor = catchedUserId?.data?.userId === review.user;
  const isLiked = review.likedBy.includes(catchedUserId?.data?.userId || "");

  return (
    <div className="border-b py-3">
      {myPage && <MyPageReviewHeader articleId={review.article} />}
      <div className={`${myPage ? "pl-7" : "pl-0"}`}>
        <div className="flex items-center">
          <ReviewHeader
            author={"손님"}
            updatedAt={review.updatedAt}
            rate={review.rate}
          />
          <div className="flex-grow" />
          {isAuthor && <ReviewMenu reviewId={review._id} />}
        </div>
        <h1 className="bold mt-2">{review.title}</h1>
        <ReviewImage images={review.images} />
        <div className="mt-5 text-gray-600 text-sm">
          <span>{review.content}</span>
        </div>
        {!myPage && (
          <ReviewLikeButton
            reviewId={review._id}
            articleId={review.article}
            initialLikes={review.likes}
            isLiked={isLiked}
          />
        )}
      </div>
    </div>
  );
}
