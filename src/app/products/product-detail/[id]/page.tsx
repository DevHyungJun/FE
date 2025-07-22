"use client";

import React, { useEffect, useState } from "react";
import useDetail from "@/hooks/useDetail";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import useGetReview from "@/hooks/useGetReview";
import ScrollUpButton from "@/app/components/ScrollUpButton";
import useAuthCheck from "@/hooks/useAuthCheck";
import ProductImageSlider from "./components/ProductImageSlider";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import { ORDERING_OPTIONS } from "@/constants/review";

type ParamsId = { id: string };

export default function ProductDetail({ params }: { params: ParamsId }) {
  const { id } = params;
  const { data, isLoading } = useDetail(id);
  const [onlyOneImage, setOnlyOneImage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: authCheckData } = useAuthCheck();
  const isLoggedIn = authCheckData?.data?.isLoggedIn;
  const [orderOption, setOrderOption] = useState(ORDERING_OPTIONS[0].value);
  const { data: reviewData, isLoading: reviewLoading } = useGetReview(
    id,
    orderOption
  );

  useEffect(() => {
    if (data?.data?.product?.images.length === 1) {
      setOnlyOneImage(true);
    } else {
      setOnlyOneImage(false);
    }
    if (!isLoggedIn) return;
    if (data?.data?.like_user_list.includes(authCheckData?.data?.userId)) {
      setIsFavorite(true);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-10">
            <div className="w-full md:w-1/2">
              <ProductImageSlider
                images={
                  data?.data?.product?.images || [data?.data?.detail_images[0]]
                }
                title={data?.data?.title || ""}
                onlyOneImage={onlyOneImage}
              />
            </div>
            <ProductInfo
              title={data?.data?.title || ""}
              price={data?.data?.product?.price || 0}
              isLoggedIn={!!isLoggedIn}
              id={id}
              data={data}
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
            />
          </div>
          <ProductTabs
            detailImages={data?.data?.detail_images || []}
            title={data?.data?.title || ""}
            createdAt={data?.data?.createdAt || ""}
            id={id}
            reviewData={reviewData}
            reviewLoading={reviewLoading}
            orderOption={orderOption}
            setOrderOption={setOrderOption}
            authCheckData={authCheckData}
          />
          <ScrollUpButton />
        </div>
      )}
    </>
  );
}
