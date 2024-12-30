"use client";

import useGetCart from "@/hooks/useGetCart";
import CartProductDetail from "../components/cartProductDetail";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import formatPrice from "@/util/formatPrice";
import useRemoveCart from "@/hooks/useRomoveCart";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { IoHeartSharp } from "react-icons/io5";
import useOrder from "@/hooks/useOrder";
import { useRouter } from "next/navigation";
import Favorite from "../components/Favorite";
import useLikeList from "@/hooks/useLikeList";

export default function Cart() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: cartData, isLoading } = useGetCart();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ id: string; price: number }[]>([]);
  const totalPrice = prices
    .filter((priceObj) => selectedItems.includes(priceObj.id))
    .reduce((acc, curr) => acc + curr.price, 0);
  const { mutate: removeMutate } = useRemoveCart();
  const { mutate: orderMutate } = useOrder();
  const [cartOrFavorite, setCartOrFavorite] = useState("cart");
  const { data: likeList, isLoading: likeLoading } = useLikeList();

  const handleAllCheckClick = () => {
    if (selectedItems.length === cartData?.article_list.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(
        cartData?.article_list.map((item: any) => item.article) || []
      );
    }
  };

  const handleItemCheck = (id: string) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const selectedRemove = () => {
    if (selectedItems.length === 0) return;
    selectedItems.forEach((id) => {
      removeMutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
      });
    });
  };

  const handleOrder = () => {
    if (selectedItems.length === 0) return;
    const orderData = selectedItems.map((item) => ({
      product: item,
      quantity: cartData?.article_list.find(
        (articleItem: { article: string }) => articleItem.article === item
      )?.quantity,
    }));
    orderMutate(orderData, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        router.push(`/order/${data?.data?._id}`);
      },
    });
  };
  console.log(cartData);
  const cartOrFavoriteStyle =
    "flex items-center gap-1 text-lg md:text-2xl font-semibold m-1 text-gray-900 border-b-4 p-2 hover:opacity-100";
  return (
    <div className="flex flex-col gap-5 max-w-[1400px] mx-auto p-1">
      <div className="flex">
        <button
          className={`${
            cartOrFavorite !== "cart" && "opacity-30 border-none"
          } ${cartOrFavoriteStyle}`}
          onClick={() => setCartOrFavorite("cart")}
        >
          <CiShoppingCart className="text-xl md:text-2xl" />
          장바구니
        </button>
        <button
          className={`${
            cartOrFavorite !== "favorite" && "opacity-30 border-none"
          } ${cartOrFavoriteStyle}`}
          onClick={() => setCartOrFavorite("favorite")}
        >
          <IoHeartSharp className="text-xl md:text-2xl text-red-500" />
          좋아요한 상품
        </button>
      </div>
      {isLoading || likeLoading ? (
        <LoadingSpinner />
      ) : cartOrFavorite === "favorite" ? (
        <Favorite
          likeList={likeList?.data?.articles}
          setCartOrFavorite={setCartOrFavorite}
        />
      ) : (
        <>
          {cartData?.article_list.length !== 0 ? (
            <>
              <h2 className="text-lg font-semibold mb-5">
                장바구니 상품 {cartData?.article_list.length}개
              </h2>
              <div className="flex justify-between">
                <Checkbox
                  isSelected={
                    selectedItems.length === cartData?.article_list.length
                  }
                  onChange={handleAllCheckClick}
                >
                  <p className="text-sm font-semibold">전체 선택</p>
                </Checkbox>
                <button className="mr-1" onClick={selectedRemove}>
                  <p className="text-sm font-semibold">선택 삭제</p>
                </button>
              </div>
              <CheckboxGroup value={selectedItems}>
                {cartData?.article_list?.map(
                  (articleItem: {
                    article: string;
                    quantity: number;
                    _id: string;
                  }) => (
                    <div className="flex" key={articleItem?.article}>
                      <Checkbox
                        value={articleItem?.article}
                        isSelected={selectedItems.includes(articleItem.article)}
                        onChange={() => handleItemCheck(articleItem?.article)}
                      />
                      <CartProductDetail
                        articleId={articleItem?.article}
                        quantity={articleItem?.quantity}
                        setPrices={setPrices}
                      />
                    </div>
                  )
                )}
              </CheckboxGroup>
              <Button
                color="primary"
                className="w-full mt-1"
                isDisabled={totalPrice === 0}
                onClick={handleOrder}
              >
                <p>
                  {totalPrice !== 0 && formatPrice(totalPrice)}
                  {totalPrice !== 0 ? " 결제하기" : "상품을 선택해주세요"}
                </p>
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 mt-10">
              <h2 className="text-lg font-semibold m-1">
                장바구니에 담긴 상품이 없습니다.
              </h2>
              <p className="text-gray-700 text-sm">상품을 추가해보세요.</p>
              <button
                className="text-sm border p-1 rounded-md mt-3"
                onClick={() => setCartOrFavorite("favorite")}
              >
                좋아요한 상품 보기
              </button>
              <div className="mt-40 border-t-2">
                <h2 className="text-lg font-semibold mt-2">
                  이런 상품은 어떠세요?
                </h2>
                <div className="flex gap-2 mt-3">
                  <div>
                    <img src="https://via.placeholder.com/150" alt="product" />
                    <p>상품명</p>
                    <p>가격</p>
                  </div>
                  <div>
                    <img src="https://via.placeholder.com/150" alt="product" />
                    <p>상품명</p>
                    <p>가격</p>
                  </div>
                  <div>
                    <img src="https://via.placeholder.com/150" alt="product" />
                    <p>상품명</p>
                    <p>가격</p>
                  </div>
                  <div>
                    <img src="https://via.placeholder.com/150" alt="product" />
                    <p>상품명</p>
                    <p>가격</p>
                  </div>
                  <div>
                    <img src="https://via.placeholder.com/150" alt="product" />
                    <p>상품명</p>
                    <p>가격</p>
                  </div>
                  <div>
                    <img src="https://via.placeholder.com/150" alt="product" />
                    <p>상품명</p>
                    <p>가격</p>
                  </div>
                </div>
              </div>
              <Link href="/products" className="w-full mt-10" passHref>
                <Button color="primary" className="w-full">
                  쇼핑 계속하기
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
