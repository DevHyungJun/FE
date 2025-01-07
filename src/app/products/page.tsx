"use client";

import { Image, Tabs, Tab } from "@nextui-org/react";
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
import useGetCategory from "@/hooks/useGetCategory";

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data, isLoading, error, isSuccess } = useAllProducts(
    page,
    selectedCategory
  );
  const [products, setProducts] = useState<PostData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const cachedData = queryClient.getQueryData<AuthCheckResponse>(["authCheck"]);
  const userId = cachedData?.data?.userId;
  const { data: category } = useGetCategory();
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    if (data?.data?.results) {
      const newProducts = data.data.results.filter(
        (newProduct: any) =>
          !products.some(
            (existingProduct) => existingProduct._id === newProduct._id
          )
      );

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...newProducts.filter(
            (newProduct: { _id: string }) =>
              !prevProducts.some(
                (existingProduct) => existingProduct._id === newProduct._id
              )
          ),
        ]);
      }
    }
  }, [data]);

  const handleRouteProductDetail = (productID: string) =>
    router.push(`products/product-detail/${productID}`);

  const FavoriteShow = (like_user_list: string[]) => {
    if (userId && like_user_list?.includes(userId)) {
      return <IoHeartSharp />;
    }
  };

  const handleTabs = (key: React.Key) => {
    setSelectedCategory(key as string);
    setProducts([]);
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="py-1">
        <Tabs
          variant="underlined"
          onSelectionChange={handleTabs}
          size="lg"
          color="primary"
          className="bold"
        >
          <Tab title="전체" key="" />
          {category?.data?.map((category: any) => (
            <Tab
              key={category._id}
              title={category.category}
              value={category._id}
            />
          ))}
        </Tabs>
      </div>
      <div className="flex items-center gap-2 text-2xl extra-bold m-1">
        {isSuccess ? (
          products?.length !== 0 ? (
            <>
              <CiShoppingTag />
              상품 목록
            </>
          ) : (
            <>
              <CiShoppingTag />
              등록된 상품이 없습니다
            </>
          )
        ) : null}
      </div>
      {isLoading && products.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 text-xs md:text-sm p-1">
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
              <div>
                <h3 className="text-sm md:text-lg bold">{product.title}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-xs md:text-medium">
                    {formatPrice(product?.product?.price)}
                  </p>
                  <div className="flex gap-1 text-lg text-red-500">
                    {FavoriteShow(product?.like_user_list)}
                  </div>
                </div>
                <div className="flex gap-2 text-xs text-gray-400 light">
                  {product?.like_count !== 0 && (
                    <p className="mt-2">좋아요 {product?.like_count}</p>
                  )}
                  {product?.comment_list.length !== 0 && (
                    <p className="mt-2">
                      상품평 {product?.comment_list.length}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {products?.length === 0 && <div className="h-[90vh]" />}
      <div ref={ref} className="h-10">
        {isLoading && products.length !== 0 && <LoadingSpinner mode="1" />}
      </div>
      {!hasMore && <div className="bg-gray-500 w-full h-10" />}
    </div>
  );
};

export default Products;
