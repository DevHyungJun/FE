'use client';

import useGetItem from "@/hooks/useGetItem";
import { Image, Pagination } from "@nextui-org/react";
import formatPrice from "@/api/formatPrice";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function ItemList() {
  const { data, isLoading, isError, error } = useGetItem();

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <>
      {isLoading ? <LoadingSpinner /> : (
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl font-semibold m-1">
            관리자 상품 목록
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 text-xs md:text-sm p-1">
            {data?.data?.map((item: any) => (
              <div
                key={item._id}
                className="flex flex-col justify-between gap-2 text-sm text-gray-800 p-2 cursor-pointer hover:bg-gray-100 rounded-md max-h-[500px] sm:max-h-[700px]"
              >
                <Image
                  src={item.thumbnail}
                  alt={item.product_name}
                  width={500}
                  className="rounded-md object-contain max-h-[300px] sm:max-h-[500px]"
                />
                <div>
                  <p className="font-semibold text-sm md:text-lg">
                    {item.product_name}
                  </p>
                  <p className="font-semibold text-xs md:text-medium">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex justify-between text-xs">
                    <p>{formatDate(item.createdAt)}</p>
                    <p>{item.stock_quantity}개의 재고</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Pagination showControls total={10} initialPage={1} />
          </div>
        </div>
      )}
    </>
  )
};