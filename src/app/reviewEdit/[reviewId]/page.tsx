"use client";

import useDetail from "@/hooks/useDetail";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import useGetSingleReview from "@/hooks/useGetSingleReview";
import ProductInfo from "./components/ProductInfo";
import ReviewEditForm from "./components/ReviewEditForm";

type ParamsReviewId = {
  reviewId: string;
};

export default function ReviewEdit({ params }: { params: ParamsReviewId }) {
  const { reviewId } = params;
  const { data: reviewData, isLoading: reviewIsLoading } =
    useGetSingleReview(reviewId);
  const { data, isLoading } = useDetail(
    reviewData?.data?.article,
    !!reviewData?.data?.article
  );
  const item = data?.data;

  return (
    <div className="p-1 max-w-[800px] mx-auto">
      <h1 className="text-xl p-3">
        <span className="extra-bold">{item?.product?.product_name} </span>
        상품평 수정하기
      </h1>
      {isLoading ? <LoadingSpinner mode="1" /> : <ProductInfo item={item} />}

      {reviewIsLoading ? (
        <LoadingSpinner mode="1" />
      ) : (
        <ReviewEditForm reviewId={reviewId} reviewData={reviewData?.data} />
      )}
    </div>
  );
}
