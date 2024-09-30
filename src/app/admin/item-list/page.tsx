'use client';

import useGetItem from "@/hooks/useGetItem";
import { Image, Pagination } from "@nextui-org/react";

export default function ItemList() {
  const { data, isLoading, isError, error } = useGetItem();

  if (isLoading) {
    return <div>Loading...</div>
  };

  if (isError) {
    return <div>Error: {error.message}</div>
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <h2 className="font-semibold pl-1">
        관리자 상품 목록
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
        {data?.data?.map((item: any) => (
          <div
            key={item.id}
            className="flex flex-col justify-between gap-2 text-sm text-gray-800 p-2 cursor-pointer"
          >
            <Image
              src={item.thumbnail}
              alt={item.product_name}
              width={300}
              height={250}
              className="rounded-md object-contain"
            />
            <p className="font-semibold">
              {item.product_name}
            </p>
            <p className="font-semibold">
              {item.price}원
            </p>
            <div className="flex justify-between text-xs">
              <p>{formatDate(item.createdAt)}</p>
              <p>{item.stock_quantity}개의 재고</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Pagination showControls total={10} initialPage={1} />
      </div>
    </div>
  )
};