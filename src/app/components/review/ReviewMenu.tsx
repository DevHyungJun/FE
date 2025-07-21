"use client";

import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import useRemoveReview from "@/hooks/useRemoveReview";

interface ReviewMenuProps {
  reviewId: string;
}

const MENU_WIDTH = "w-[60px]";

export default function ReviewMenu({ reviewId }: ReviewMenuProps) {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: removeReviewMutate } = useRemoveReview();

  const handleRouteEdit = () => router.push(`/reviewEdit/${reviewId}`);

  const handleRemove = () => {
    removeReviewMutate(reviewId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reviews"] });
        queryClient.invalidateQueries({ queryKey: ["userReviews"] });
      },
    });
  };

  const showMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMenu((prev) => !prev);
  };

  return (
    <div className="flex justify-end flex-grow relative">
      <button onClick={showMenu}>
        <BsThreeDots className="text-lg" />
      </button>
      {menu && (
        <div className="fixed inset-0 z-10" onClick={() => setMenu(false)} />
      )}
      <div
        className={`flex flex-col gap-2 p-2 ${MENU_WIDTH} bg-white border rounded-md absolute top-4 text-sm ${
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
  );
}
