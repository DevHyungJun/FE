"use client";

import useDetail from "@/hooks/useDetail";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";
import formatPrice from "@/util/formatPrice";
import { useState, useEffect } from "react";

export default function RecommendItems() {
  const productIds = JSON.parse(localStorage.getItem("productIds") || "[]");
  const [loadedItems, setLoadedItems] = useState<Record<string, boolean>>({});
  const [isAllLoaded, setIsAllLoaded] = useState(false);

  useEffect(() => {
    if (Object.keys(loadedItems).length === productIds.length) {
      const allLoaded = Object.values(loadedItems).every(
        (status) => status === true
      );
      setIsAllLoaded(allLoaded);
    }
  }, [loadedItems]);

  const handleItemLoad = (id: string, status: boolean) => {
    setLoadedItems((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  return (
    <div className="mt-40 border-t-2">
      <h2 className="text-lg bold my-2">이런 상품은 어떠세요?</h2>
      {isAllLoaded && <LoadingSpinner mode="1" />}
      <div className="flex gap-4">
        {productIds.map((id: string) => (
          <RecommendItem key={id} id={id} onLoad={handleItemLoad} />
        ))}
      </div>
    </div>
  );
}

const RecommendItem = ({
  id,
  onLoad,
}: {
  id: string;
  onLoad: (id: string, status: boolean) => void;
}) => {
  const { data, isLoading } = useDetail(id, !!id);

  useEffect(() => {
    if (!isLoading && data) {
      onLoad(id, true);
    }
  }, [isLoading, data]);

  if (isLoading || !data) {
    return null;
  }

  return (
    <Link href={`/products/product-detail/${id}`} className="hover:opacity-50">
      <div className="border rounded-md max-w-[250px]">
        <Image
          src={data.data.product.thumbnail}
          width={250}
          height={250}
          alt="article-image"
          className="w-[200px] h-[200px] object-contain"
        />
        <h1 className="font-bold text-sm">{data.data.product.product_name}</h1>
        <p className="text-end text-gray-500 text-sm">
          {formatPrice(data.data.product.price)}
        </p>
      </div>
    </Link>
  );
};
