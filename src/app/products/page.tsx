'use client';

import { Image } from "@nextui-org/react";
import useAllProducts from "@/hooks/useAllProducts";
import { useRouter } from "next/navigation";
import formatPrice from "@/util/formatPrice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { PostData } from "../../../types/Product";
import { IoHeartSharp } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { CiShoppingTag } from "react-icons/ci";

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
    if (data?.data?.results) {
      const newProducts = data.data.results.filter(
        (newProduct: any) => !products.some(existingProduct => existingProduct._id === newProduct._id)
      );

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts(prevProducts => [...prevProducts, ...newProducts]);
      }
    }
  }, [data]);

  const handleRouteProductDetail = (productID: string) => router.push(`products/product-detail/${productID}`);

  const FavoriteShow = (like_user_list: string[]) => {
    if (userId && like_user_list?.includes(userId)) {
      return <IoHeartSharp />;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex items-center gap-2 text-2xl font-semibold m-1">
        <CiShoppingTag />
        상품 목록
      </div>
      {isLoading && products.length === 0 ? <LoadingSpinner /> :
        (<div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 text-xs md:text-sm p-1">
          {products.map((product: PostData) => (
            <div
              key={product._id}
              className="flex flex-col justify-between gap-2 text-sm text-gray-800 p-2 cursor-pointer hover:bg-gray-100 rounded-md max-h-[500px] sm:max-h-[700px] min-h-[300px] sm:min-h-[500px]"
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
                  <div className="flex gap-1 text-lg text-red-500">
                    {FavoriteShow(product?.like_user_list)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>)}
      <div ref={ref} className="h-10">
        {isLoading && products.length !== 0 && <LoadingSpinner mode="1" />}
      </div>
      {!hasMore && <div className="bg-blue-500 w-full h-10" />}
    </div>
  );
};

export default Products;