"use client";

import React, { useEffect, useState } from "react";
import useDetail from "@/hooks/useDetail";
import {
  Button,
  Image,
  Accordion,
  AccordionItem,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Slider from "react-slick";
import formatPrice from "@/util/formatPrice";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import formatDate from "@/util/formatDate";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import useFavoritePost from "@/hooks/useFavoritePost";
import useFavoriteDelete from "@/hooks/useFavoriteDelete";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";
import useAddCart from "@/hooks/useAddCart";
import useOrder from "@/hooks/useOrder";
import ReviewItem from "@/app/components/reviewItem";
import useGetReview from "@/hooks/useGetReview";
import Link from "next/link";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";

type ParamsId = { id: string };
type AuthCheckResponse = {
  code: number;
  data: {
    email: string;
    isLoggedIn: boolean;
    role: string;
    userId: string;
    username: string;
    message: string;
  };
};

export default function ProductDetail({ params }: { params: ParamsId }) {
  const { id } = params;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading, isError, error } = useDetail(id);
  const { mutate: favoritePostMutate } = useFavoritePost();
  const { mutate: favoriteDeleteMutate } = useFavoriteDelete();
  const [quantity, setQuantity] = useState(1);
  const [onlyOneImage, setOnlyOneImage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const cachedData = queryClient.getQueryData<AuthCheckResponse>(["authCheck"]);
  const isLoggedIn = cachedData?.data?.isLoggedIn;
  const { mutate: addCartMutate } = useAddCart();
  const { mutate: orderMutate } = useOrder();
  const [orderOption, setOrderOption] = useState("updatedAt");
  const { data: reviewData, isLoading: reviewLoading } = useGetReview(
    id,
    orderOption
  );

  const orderingOptions = [
    { label: "날짜순", value: "updatedAt" },
    { label: "추천순", value: "-likes" },
    { label: "별점순", value: "-rate" },
  ];

  useEffect(() => {
    if (data?.data?.product?.images.length === 1) {
      setOnlyOneImage(true);
    } else {
      setOnlyOneImage(false);
    }

    if (!isLoggedIn) return;
    if (data?.data?.like_user_list.includes(cachedData?.data?.userId)) {
      setIsFavorite(true);
    }
  }, [data]);

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

  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const plusQuantity = () => {
    if (quantity >= 20) return;
    setQuantity(quantity + 1);
  };

  const settings = {
    arrows: false,
    dots: !onlyOneImage,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  const handleRouteOrder = () => {
    orderMutate([{ product: id, quantity }], {
      onSuccess: (data) => {
        router.push(`/order/${data?.data?._id}`);
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
        <div className="max-w-[1200px] mx-auto px-1">
          <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-10">
            <div className="w-full md:w-1/2">
              <Slider {...settings} className="mb-5">
                {data?.data?.product?.images.map((img: string, i: number) => (
                  <div key={i}>
                    <Image
                      src={img}
                      width="100%"
                      alt={data?.data?.title}
                      className="mx-auto object-contain max-h-[400px] md:max-h-[600px]"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center gap-3 pt-0 md:pt-32">
              <h2 className="text-center text-xl font-semibold text-gray-800">
                {data?.data?.title}
              </h2>
              <p className="text-md font-semibold">
                {formatPrice(data?.data?.product?.price)}
              </p>
              <div className="flex gap-3 items-center rounded-sm">
                <button
                  onClick={minusQuantity}
                  className="p-2 border hover:bg-gray-50 rounded-md"
                >
                  <FiMinus className="text-sm md:text-medium" />
                </button>
                <p className="text-sm">{quantity}</p>
                <button
                  onClick={plusQuantity}
                  className="p-2 border hover:bg-gray-50 rounded-md"
                >
                  <FiPlus className="text-sm md:text-medium" />
                </button>
              </div>
              <div className="flex-col md:flex items-center gap-1">
                <Button
                  color="primary"
                  className="w-[300px] text-xs md:text-medium mt-2"
                  onClick={handleRouteOrder}
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
          </div>
          <Tabs variant="underlined">
            <Tab key="productDetail" title="정보" textValue="productDetail">
              <Accordion className="border-y" fullWidth={true}>
                <AccordionItem
                  key="detail"
                  textValue="detail"
                  startContent={
                    <div className="font-semibold">제품 상세 정보 보기</div>
                  }
                >
                  <div className="flex flex-col max-w-[900px] mx-auto items-center mt-10">
                    <p className="text-xs md:text-medium text-gray-500 mb-5">
                      {formatDate(data?.data?.createdAt)}에 등록된 상품입니다.
                    </p>
                    {data?.data?.detail_images.map((img: string, i: number) => (
                      <Image
                        key={i}
                        src={img}
                        alt={data?.data?.title}
                        width={800}
                      />
                    ))}
                  </div>
                </AccordionItem>
              </Accordion>
            </Tab>
            <Tab key="review" title="리뷰" textValue="review">
              <Link href={`/review/${id}`} className="border-t py-3">
                <Button variant="flat" className="w-full">
                  상품평 작성하러 가기
                </Button>
              </Link>
              {reviewLoading ? (
                <LoadingSpinner mode="1" />
              ) : (
                <>
                  <div className="flex justify-end">
                    <Select
                      items={orderingOptions}
                      label="정렬"
                      className="w-[100px]"
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
                  {reviewData?.data?.map((reviewItem: any) => (
                    <ReviewItem key={reviewItem._id} review={reviewItem} />
                  ))}
                </>
              )}
              {reviewData?.data?.length === 0 && (
                <p className="text-center text-gray-500 py-10">
                  등록된 상품평이 없습니다.
                </p>
              )}
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
}
