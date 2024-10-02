'use client';

import { Image, Pagination } from "@nextui-org/react";
import useAllProducts from "@/hooks/useAllProducts";
import { useRouter } from "next/navigation";
import formatPrice from "@/api/formatPrice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState } from "react";

const Products = () => {
  const router = useRouter();
  const { data, isLoading } = useAllProducts(2);
  const [page, setPage] = useState(1);

  const handleRouteProductDetail = (productID: string) => router.push(`products/product-detail/${productID}`);

  return (
    <>
      {isLoading ? <LoadingSpinner /> : (
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl font-semibold m-1">
            상품 목록
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 text-xs md:text-sm p-1">
            {data?.data?.results.map((product: any) => (
              <div
                key={product._id}
                className="flex flex-col justify-between gap-2 text-sm text-gray-800 p-2 cursor-pointer hover:bg-gray-100 rounded-md max-h-[500px] sm:max-h-[700px]"
                onClick={() => handleRouteProductDetail(product?._id)}
              >
                <Image
                  src={product?.product.thumbnail}
                  alt={product.title}
                  width={500}
                  className="rounded-md object-contain max-h-[300px] sm:max-h-[500px]"
                />
                <div className="font-semibold">
                  <h3 className="text-sm md:text-lg">{product.title}</h3>
                  <p className="text-xs md:text-medium">
                    {formatPrice(product?.product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Pagination showControls total={10} initialPage={page} />
          </div>
        </div>
      )}
    </>
  );
};

export default Products;