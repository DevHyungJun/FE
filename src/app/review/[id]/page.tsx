"use client";

import useDetail from "@/hooks/useDetail";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ProductInfo from "@/app/components/review/ProductInfo";
import ReviewForm from "./components/ReviewForm";

type ParamsId = { id: string };

export default function Review({ params }: { params: ParamsId }) {
  const { id } = params;
  const { data, isLoading } = useDetail(id);
  const item = data?.data;

  return (
    <div className="p-1 max-w-[800px] mx-auto">
      <h1 className="text-lg sm:text-xl p-3 text-center">
        <span className="extra-bold overflow-hidden line-clamp-1 text-ellipsis">
          {item?.product?.product_name}{" "}
        </span>
        상품평 작성하기
      </h1>
      {isLoading ? (
        <LoadingSpinner mode="1" />
      ) : (
        <>
          <ProductInfo item={item} />
          <ReviewForm id={id} />
        </>
      )}
    </div>
  );
}
