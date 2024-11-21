'use client';

import useGetItem from "@/hooks/useGetItem";
import { Image } from "@nextui-org/react";
import formatPrice from "@/util/formatPrice";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import formatDate from "@/util/formatDate";

type ItemListType = {
  createdAt: string;
  images: string[];
  price: number;
  product_name: string;
  stock_quantity: number;
  thumbnail: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

export default function ItemList() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<ItemListType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, isLoading, isError, error, isSuccess } = useGetItem(page);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px'
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    if (data?.data) {
      const newProducts = data.data.filter(
        (newProduct: any) => !products.some(existingProduct => existingProduct._id === newProduct._id)
      );
  
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [
          ...prevProducts, 
          ...newProducts.filter((newProduct: { _id: string; }) => !prevProducts.some(existingProduct => existingProduct._id === newProduct._id))
        ]);
      }
    }
  }, [data]);

  return (
    <div className="max-w-[1400px] mx-auto">
      <h2 className="text-2xl font-semibold m-1">
      {isSuccess ? (products?.length === 0 ? '등록된 상품이 없습니다' : '관리자 상품 목록') : null}
      </h2>
      {isLoading && products.length === 0 ? <LoadingSpinner /> : (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 text-xs md:text-sm p-1">
        {products.map((item: ItemListType) => (
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
      )}
      {products?.length === 0 && <div className="h-[90vh]"/>}
      <div ref={ref} className="h-10">
        {isLoading && products.length !== 0 && <LoadingSpinner mode="1" />}
      </div>
      {!hasMore && <div className="bg-blue-500 w-full h-10" />}
    </div>
  )
};