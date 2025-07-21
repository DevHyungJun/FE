"use client";

import useDetail from "@/hooks/useDetail";
import Image from "next/image";
import Link from "next/link";

interface MyPageReviewHeaderProps {
  articleId: string;
}

const THUMBNAIL_SIZE = 150;

export default function MyPageReviewHeader({
  articleId,
}: MyPageReviewHeaderProps) {
  const { data: detail, isLoading: detailIsLoading } = useDetail(
    articleId,
    true
  );

  if (detailIsLoading) {
    return <div className="h-[174px] bg-gray-50 rounded-md mb-5" />;
  }

  if (!detail?.data) {
    return null;
  }

  return (
    <div className="flex gap-2 items-center bg-gray-50 rounded-md mb-5">
      <Link
        href={`/products/product-detail/${detail.data._id}`}
        className="hover:brightness-70"
      >
        <Image
          src={detail.data.product?.thumbnail}
          alt="Product Image"
          className="border-t border-b border-l rounded-md rounded-r-none"
          width={THUMBNAIL_SIZE}
          height={THUMBNAIL_SIZE}
        />
      </Link>
      <h1 className="bold text-center">
        <Link
          href={`/products/product-detail/${detail.data._id}`}
          className="hover:underline hover:text-blue-500"
        >
          {detail.data.product?.product_name}
        </Link>
        <span className="text-gray-500 light"> 상품에 대한 리뷰 </span>
      </h1>
    </div>
  );
}
