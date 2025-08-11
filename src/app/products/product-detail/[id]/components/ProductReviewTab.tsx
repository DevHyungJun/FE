import Link from "next/link";
import { Button } from "@nextui-org/react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ReviewItem from "@/app/components/ReviewItem";
import ReviewOrderSelect from "@/app/components/review/ReviewOrderSelect";
import { ReviewData } from "@/types/review";
import useAuthCheck from "@/hooks/useAuthCheck";

interface ProductReviewTabProps {
  id: string;
  reviewData: { data: ReviewData[] };
  orderOption: string;
  setOrderOption: (orderOption: string) => void;
  reviewLoading: boolean;
}

export default function ProductReviewTab({
  id,
  reviewData,
  orderOption,
  setOrderOption,
  reviewLoading,
}: ProductReviewTabProps) {
  const { data: authCheckData } = useAuthCheck();

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
          {reviewData?.data?.map((reviewItem: ReviewData) => (
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
