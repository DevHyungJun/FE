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
import ScrollUpButton from "../components/ScrollUpButton";

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
    if (inView && hasMore && !isLoading && data?.data?.next) {
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
      <div className="py-1 border-b-8 mb-3">
        <Tabs
          variant="underlined"
          onSelectionChange={handleTabs}
          size="lg"
          color="primary"
          className="bold"
          classNames={{
            tabList: "flex-wrap",
            tab: "max-w-[50px]",
          }}
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
        <div className="max-w-[450px] sm:max-w-full mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs md:text-sm p-1">
          {products.map((product: PostData) => (
            <div
              key={product._id}
              className="flex flex-col gap-2 text-sm text-gray-800 cursor-pointer transition-all hover:translate-y-[-10px] rounded-md max-w-[200px] min-h-[200px] sm:max-w-[300px] sm:min-h-[300px] border shadow-sm"
              onClick={() => handleRouteProductDetail(product?._id)}
            >
              <Image
                src={product?.product?.thumbnail}
                alt={product?.title}
                className="w-[200px] min-h-[200px] sm:w-[300px] sm:min-h-[300px] rounded-md object-cover"
              />
              <div className="p-2">
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
      <ScrollUpButton />
    </div>
  );
};

export default Products;
