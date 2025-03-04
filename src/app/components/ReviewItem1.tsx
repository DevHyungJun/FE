"use client";

import Image from "next/image";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import useRemoveReview from "@/hooks/useRemoveReview";
import { useQueryClient } from "@tanstack/react-query";
import { Rate } from "antd";
import { useRouter } from "next/navigation";
import usePostLike from "@/hooks/usePostLike";
import useUnlike from "@/hooks/useUnlike";
import formatDate from "@/util/formatDate";
import Swal from "sweetalert2";
import useDetail from "@/hooks/useDetail";
import Link from "next/link";

interface UserId {
  data: {
    userId: string;
    email: string;
    isLoggedIn: boolean;
    role: string;
    username: string;
  };
}

export default function ReviewItem({
  review,
  myPage = false,
}: {
  review: any;
  myPage?: boolean;
}) {
  const queryClient = useQueryClient();
  const [fullsize, setFullsize] = useState(false);
  const [menu, setMenu] = useState(false);
  const imgSize = fullsize ? 500 : 100;
  const { mutate: removeReviewMutate } = useRemoveReview();
  const router = useRouter();
  const { mutate: postLikeMutate, isPending: postLikePending } = usePostLike();
  const { mutate: unlikeMutate, isPending: unlikePending } = useUnlike();
  const { data: detail, isLoading: detailIsLoading } = useDetail(
    review.article,
    myPage
  );

  const catchedUserId = queryClient.getQueryData<UserId>(["authCheck"]);
  const likeCheck = review.likedBy.includes(catchedUserId?.data?.userId);

  const showMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMenu((prev) => !prev);
  };

  const handleRemove = () => {
    removeReviewMutate(review?._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reviews"] });
      },
    });
  };

  const handleRouteEdit = () => router.push(`/reviewEdit/${review._id}`);

  const handlePostLike = () => {
    if (postLikePending || unlikePending) return;
    if (!catchedUserId?.data?.isLoggedIn) {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요한 서비스입니다.",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }

    if (likeCheck) {
      unlikeMutate(review._id, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["reviews", review.article],
          });
        },
      });
      return;
    }
    postLikeMutate(review._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["reviews", review.article],
        });
      },
    });
  };

  return (
    <div className="border-b py-3">
      {myPage && !detailIsLoading ? (
        <div className="flex gap-2 items-center bg-gray-50 rounded-md mb-5">
          <Link
            href={`/products/product-detail/${detail?.data?._id}`}
            className="hover:brightness-70"
          >
            <Image
              src={detail?.data?.product?.thumbnail}
              alt="Product Image"
              className="border-t border-b border-l rounded-md rounded-r-none"
              width={150}
              height={150}
            />
          </Link>
          <h1 className="bold text-center">
            <Link
              href={`/products/product-detail/${detail?.data?._id}`}
              className="hover:underline hover:text-blue-500"
            >
              {detail?.data?.product?.product_name}
            </Link>
            <span className="text-gray-500 light"> 상품에 대한 리뷰 </span>
          </h1>
        </div>
      ) : null}
      <div className={`${myPage ? "pl-7" : "pl-0"}`}>
        <div className="flex gap-3 items-center">
          <Image
            src="/basic_profile.png"
            alt="Profile Image"
            width={30}
            height={30}
          />
          <div className="text-sm space-y-1">
            <div className="flex items-center gap-2">
              <p className="bold">nickname</p>
              <p className="text-gray-400 text-xs light">
                {formatDate(review?.updatedAt)}
              </p>
            </div>
            <Rate
              value={review.rate}
              disabled
              style={{
                fontSize: fullsize ? "24px" : "12px",
              }}
            />
            <span
              className={`ml-1 ${fullsize ? "text-[24px]" : "text-[14px]"}`}
            >
              {review.rate}
            </span>
          </div>
          <div className="flex-grow" />
          <div className="flex justify-end flex-grow relative">
            <button onClick={showMenu}>
              <BsThreeDots className="text-lg" />
            </button>
            {menu && (
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenu(false)}
              />
            )}
            <div
              className={`flex flex-col gap-2 p-2 w-[60px] bg-white border rounded-md absolute top-4 text-sm ${
                menu ? "block" : "hidden"
              } shadow-md z-10`}
            >
              <button className="hover:font-semibold" onClick={handleRouteEdit}>
                수정
              </button>
              <button className="hover:font-semibold" onClick={handleRemove}>
                삭제
              </button>
            </div>
          </div>
        </div>
        <h1 className="bold">{review.title}</h1>
        <div
          className={`flex ${fullsize ? "flex-col" : "flex-row"} gap-1 mt-10`}
        >
          {review.images.map((img: string) => (
            <Image
              src={img}
              key={img}
              alt="img"
              width={imgSize}
              height={imgSize}
              className="rounded-md object-cover"
              onClick={() => setFullsize((prev) => !prev)}
            />
          ))}
        </div>

        <div className="mt-5 text-gray-600 text-sm">
          <span>{review.content}</span>
        </div>

        {!myPage && (
          <div className="flex items-center gap-0.5 mt-5 text-gray-600">
            <button onClick={handlePostLike}>
              {likeCheck ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike className="text-lg" />
              )}
            </button>
            <p className="mt-[2px]">{review.likes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
