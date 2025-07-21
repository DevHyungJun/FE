"use client";

import React, { useEffect, useState } from "react";
import useDetail from "@/hooks/useDetail";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import useFavoritePost from "@/hooks/useFavoritePost";
import useFavoriteDelete from "@/hooks/useFavoriteDelete";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useAddCart from "@/hooks/useAddCart";
import useOrder from "@/hooks/useOrder";
import useGetReview from "@/hooks/useGetReview";
import ScrollUpButton from "@/app/components/ScrollUpButton";
import useAuthCheck from "@/hooks/useAuthCheck";
import ProductImageSlider from "./components/ProductImageSlider";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import { ORDERING_OPTIONS, MIN_QUANTITY } from "@/constants/review";

type ParamsId = { id: string };

export default function ProductDetail({ params }: { params: ParamsId }) {
  const { id } = params;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading } = useDetail(id);
  const { mutate: favoritePostMutate } = useFavoritePost();
  const { mutate: favoriteDeleteMutate } = useFavoriteDelete();
  const [quantity, setQuantity] = useState(MIN_QUANTITY);
  const [onlyOneImage, setOnlyOneImage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: authCheckData } = useAuthCheck();
  const isLoggedIn = authCheckData?.data?.isLoggedIn;
  const { mutate: addCartMutate } = useAddCart();
  const { mutate: orderMutate, isPending: orderIsPending } = useOrder();
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

  const handleRouteOrder = () => {
    const articleId = data?.data?._id;
    const product = data?.data?.product?._id;
    if (!articleId && !product) return;
    orderMutate([{ articleId, product, quantity }], {
      onSuccess: (data) => {
        if (data?.data?._id) {
          router.push(`/order/${data?.data?._id}`);
        }
      },
    });
  };
  const handleAddCart = () => {
    const article = { article: data?.data?._id, quantity };
    addCartMutate(article, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "장바구니",
          text: "상품을 장바구니에 추가했습니다.",
          showConfirmButton: false,
          timer: 1000,
        });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-10">
            <div className="w-full md:w-1/2">
              <ProductImageSlider
                images={data?.data?.product?.images || []}
                title={data?.data?.title || ""}
                onlyOneImage={onlyOneImage}
              />
            </div>
            <ProductInfo
              title={data?.data?.title || ""}
              price={data?.data?.product?.price || 0}
              quantity={quantity}
              setQuantity={setQuantity}
              onOrder={handleRouteOrder}
              onAddCart={handleAddCart}
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
              isLoggedIn={!!isLoggedIn}
              orderIsPending={orderIsPending}
              favoritePostMutate={favoritePostMutate}
              favoriteDeleteMutate={favoriteDeleteMutate}
              queryClient={queryClient}
              router={router}
              id={id}
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
