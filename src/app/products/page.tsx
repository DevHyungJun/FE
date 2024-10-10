'use client';

import { Image } from "@nextui-org/react";
import useAllProducts from "@/hooks/useAllProducts";
import { useRouter } from "next/navigation";
import formatPrice from "@/util/formatPrice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState, useCallback } from "react";
import { PostData } from "../../../types/Product";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";

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

const Products = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useAllProducts(page);
  const [products, setProducts] = useState<PostData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const cachedData = queryClient.getQueryData<AuthCheckResponse>(['authCheck']);
  const userId = cachedData?.data?.userId;

  useEffect(() => {
    if (data) {
      setProducts((prev) => {
        const newProducts = data.data.results.filter(
          (newProduct: PostData) => !prev.some((p) => p._id === newProduct._id)
        );
        return [...prev, ...newProducts];
      });
      setHasMore(data.data.next !== null);
    }
  }, [data]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 &&
      !isLoading &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleRouteProductDetail = (productID: string) => router.push(`products/product-detail/${productID}`);

  const FavoriteShow = (like_user_list: string[]) => {
    if (userId && like_user_list.includes(userId)) {
      return <IoHeartSharp />;
    }
    return <IoHeartOutline />;
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      <h2 className="text-2xl font-semibold m-1">
        상품 목록
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 text-xs md:text-sm p-1">
        {products.map((product: PostData) => (
          <div
            key={product._id}
            className="flex flex-col justify-between gap-2 text-sm text-gray-800 p-2 cursor-pointer hover:bg-gray-100 rounded-md max-h-[500px] sm:max-h-[700px]"
            onClick={() => handleRouteProductDetail(product?._id)}
          >
            <Image
              src={product?.product?.thumbnail}
              alt={product?.title}
              width={500}
              className="rounded-md object-contain max-h-[300px] sm:max-h-[500px]"
            />
            <div className="font-semibold">
              <h3 className="text-sm md:text-lg">{product.title}</h3>
              <div className="flex justify-between items-center">
                <p className="text-xs md:text-medium">
                  {formatPrice(product?.product?.price)}
                </p>
                <div className="flex gap-1 text-lg text-red-600">
                  {FavoriteShow(product?.like_user_list)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isLoading && <LoadingSpinner />}
      {!hasMore && <p className="text-center text-lg m-1">마지막 페이지</p>}
    </div>
  );
};

export default Products;