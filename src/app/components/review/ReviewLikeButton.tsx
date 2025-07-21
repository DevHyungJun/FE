"use client";

import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import usePostLike from "@/hooks/usePostLike";
import useUnlike from "@/hooks/useUnlike";

interface ReviewLikeButtonProps {
  reviewId: string;
  articleId: string;
  initialLikes: number;
  isLiked: boolean;
}

interface UserId {
  data: {
    isLoggedIn: boolean;
  };
}

export default function ReviewLikeButton({
  reviewId,
  articleId,
  initialLikes,
  isLiked,
}: ReviewLikeButtonProps) {
  const queryClient = useQueryClient();
  const { mutate: postLikeMutate, isPending: postLikePending } = usePostLike();
  const { mutate: unlikeMutate, isPending: unlikePending } = useUnlike();

  const handlePostLike = () => {
    if (postLikePending || unlikePending) return;

    const catchedUserId = queryClient.getQueryData<UserId>(["authCheck"]);
    if (!catchedUserId?.data?.isLoggedIn) {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요한 서비스입니다.",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }

    const commonOptions = {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reviews", articleId] });
      },
    };

    if (isLiked) {
      unlikeMutate(reviewId, commonOptions);
    } else {
      postLikeMutate(reviewId, commonOptions);
    }
  };

  return (
    <div className="flex items-center gap-0.5 mt-5 text-gray-600">
      <button onClick={handlePostLike}>
        {isLiked ? <AiFillLike /> : <AiOutlineLike className="text-lg" />}
      </button>
      <p className="mt-[2px]">{initialLikes}</p>
    </div>
  );
}
