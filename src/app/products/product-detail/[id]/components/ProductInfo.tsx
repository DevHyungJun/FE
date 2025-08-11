"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaCartPlus } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import formatPrice from "@/util/formatPrice";
import { MIN_QUANTITY, MAX_QUANTITY } from "@/constants/review";
import Swal from "sweetalert2";
import useOrder from "@/hooks/useOrder";
import { useRouter } from "next/navigation";
import useAddCart from "@/hooks/useAddCart";
import { useQueryClient } from "@tanstack/react-query";
import useFavoritePost from "@/hooks/useFavoritePost";
import useFavoriteDelete from "@/hooks/useFavoriteDelete";
import { PostData, Product } from "@/types/Product";

interface ProductInfoProps {
  title: string;
  price: number;
  isFavorite: boolean;
  setIsFavorite: (b: boolean) => void;
  isLoggedIn: boolean;
  id: string;
  data: { data: PostData };
}

export default function ProductInfo({
  title,
  price,
  isFavorite,
  setIsFavorite,
  isLoggedIn,
  id,
  data,
}: ProductInfoProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(MIN_QUANTITY);
  const { mutate: orderMutate, isPending: orderIsPending } = useOrder();
  const { mutate: addCartMutate } = useAddCart();
  const { mutate: favoritePostMutate } = useFavoritePost();
  const { mutate: favoriteDeleteMutate } = useFavoriteDelete();
  console.log(data);
  const handleMinus = () => {
    if (quantity > MIN_QUANTITY) {
      setQuantity(quantity - 1);
    }
  };
  const handlePlus = () => {
    if (quantity >= MAX_QUANTITY) return;
    setQuantity(quantity + 1);
  };

  const handleFavorite = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "error",
        title: "좋아요",
        text: "로그인이 필요한 서비스입니다.",
      });
      router.push("/login");
      return;
    }
    if (isFavorite) {
      favoriteDeleteMutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["allProducts"] });
          queryClient.invalidateQueries({ queryKey: ["productDetail", id] });
          setIsFavorite(false);
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "좋아요",
            text: "상품을 좋아요 목록에서 삭제하지 못했습니다.",
          });
        },
      });
    } else {
      favoritePostMutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["allProducts"] });
          queryClient.invalidateQueries({ queryKey: ["productDetail", id] });
          setIsFavorite(true);
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "좋아요",
            text: "상품을 좋아요 목록에 추가하지 못했습니다.",
          });
        },
      });
    }
  };

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
    <div className="w-full md:w-1/2 flex flex-col items-center gap-3 pt-0 md:pt-32">
      <h2 className="text-center text-xl extra-bold text-gray-800">{title}</h2>
      <p className="text-md bold">{formatPrice(price)}</p>
      <div className="flex gap-3 items-center rounded-sm">
        <button
          onClick={handleMinus}
          className="p-2 border hover:bg-gray-50 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
          disabled={quantity <= MIN_QUANTITY}
        >
          <FiMinus className="text-sm md:text-medium" />
        </button>
        <p className="text-sm">{quantity}</p>
        <button
          onClick={handlePlus}
          className="p-2 border hover:bg-gray-50 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
          disabled={quantity >= MAX_QUANTITY}
        >
          <FiPlus className="text-sm md:text-medium" />
        </button>
      </div>
      <div className="flex-col md:flex items-center gap-1">
        <Button
          color="primary"
          className="w-[300px] text-xs md:text-medium mt-2 bold"
          onClick={handleRouteOrder}
          isLoading={orderIsPending}
        >
          구매하기
        </Button>
        <div className="w-full flex justify-end gap-2">
          <button className="text-3xl mt-2" onClick={handleAddCart}>
            <FaCartPlus className="text-gray-500" />
          </button>
          <button
            className="text-3xl text-red-500 mt-2"
            onClick={handleFavorite}
          >
            {isFavorite ? <IoHeartSharp /> : <IoHeartOutline />}
          </button>
        </div>
      </div>
    </div>
  );
}
