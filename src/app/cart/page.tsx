"use client";

import useGetCart from "@/hooks/useGetCart";
import CartProductDetail from "../components/CartProductDetail";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { useEffect, useState } from "react";
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
import MostPopular from "../components/MostPopular";

interface CartArticle {
  article: string;
  quantity: number;
}

interface Item {
  article: string;
  product: string;
  quantity: number;
  price: number;
  onSelected: boolean;
}

export default function Cart() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: cartData, isLoading } = useGetCart();
  const [items, setItems] = useState<Item[]>([]);
  const { mutate: removeMutate } = useRemoveCart();
  const { mutate: orderMutate, isPending: orderIsPending } = useOrder();
  const [cartOrFavorite, setCartOrFavorite] = useState("cart");
  const { data: likeList, isLoading: likeLoading } = useLikeList();

  useEffect(() => {
    if (cartData) {
      setItems(
        cartData.article_list.map((item: CartArticle) => ({
          article: item.article,
          product: "",
          quantity: item.quantity,
          price: 0,
          onSelected: false,
        }))
      );
    }
  }, [cartData]);

  const handleAllCheckClick = () => {
    if (
      items.filter((item) => item.onSelected).length ===
      cartData?.article_list.length
    ) {
      setItems(items.map((item) => ({ ...item, onSelected: false })));
    } else {
      setItems(items.map((item) => ({ ...item, onSelected: true })));
    }
  };

  const totalItemPrice = () => {
    return items
      .filter((item) => item.onSelected)
      .reduce((total, item) => total + item.price, 0);
  };

  const isSelectedItem = () => {
    return items.some((item) => item.onSelected);
  };

  const handleItemCheck = (checkedItem: Item) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.article === checkedItem.article
          ? { ...item, onSelected: !item.onSelected }
          : item
      )
    );
  };

  const selectedRemove = () => {
    const selectedItems = items.filter((item) => item.onSelected);
    if (selectedItems.length === 0) return;
    selectedItems.forEach((item) => {
      removeMutate(item.article, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
      });
    });
  };

  const handleOrder = () => {
    const selectedItems = items.filter((item) => item.onSelected);
    if (selectedItems.length === 0) return;
    const orderData = selectedItems.map((item) => ({
      articleId: item.article,
      product: item.product,
      quantity: item.quantity,
    }));
    orderMutate(orderData, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        router.push(`/order/${data?.data?._id}`);
      },
    });
  };

  const cartOrFavoriteStyle =
    "w-1/2 flex justify-center items-center gap-1 text-medium md:text-xl extra-bold text-gray-900 border-b-2 border-gray-900 p-2 hover:opacity-100";
  return (
    <div className="flex flex-col gap-5 max-w-[1280px] mx-auto p-1 overflow-x-hidden">
      <div className="flex w-full">
        <button
          className={`${
            cartOrFavorite !== "cart" && "opacity-30 border-gray-300"
          } ${cartOrFavoriteStyle}`}
          onClick={() => setCartOrFavorite("cart")}
        >
          장바구니
        </button>
        <button
          className={`${
            cartOrFavorite !== "favorite" && "opacity-30 border-gray-300"
          } ${cartOrFavoriteStyle}`}
          onClick={() => setCartOrFavorite("favorite")}
        >
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
              <h2 className="text-lg bold mb-5">
                장바구니 상품 {cartData?.article_list.length}개
              </h2>
              <div className="flex justify-between">
                <Checkbox
                  isSelected={
                    items.filter((item) => item.onSelected).length ===
                    cartData?.article_list.length
                  }
                  onChange={handleAllCheckClick}
                >
                  <p className="text-sm bold">전체 선택</p>
                </Checkbox>
                <button className="mr-1" onClick={selectedRemove}>
                  <p className="text-sm bold">선택 삭제</p>
                </button>
              </div>
              <CheckboxGroup
                value={items
                  .filter((item) => item.onSelected)
                  .map((item) => item.article)}
              >
                {items.map((item) => (
                  <div className="flex" key={item.article}>
                    <Checkbox
                      value={item.article}
                      isSelected={item.onSelected}
                      onChange={() => handleItemCheck(item)}
                    />
                    <CartProductDetail item={item} setItems={setItems} />
                  </div>
                ))}
              </CheckboxGroup>
              <Button
                color="primary"
                className="w-full mt-1 bold"
                isDisabled={!isSelectedItem()}
                isLoading={orderIsPending}
                onClick={handleOrder}
              >
                <p>
                  {isSelectedItem() && formatPrice(totalItemPrice())}
                  {isSelectedItem() ? " 결제하기" : "상품을 선택해주세요"}
                </p>
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 mt-10">
              <h2 className="text-lg bold m-1">
                장바구니에 담긴 상품이 없습니다.
              </h2>
              <p className="text-gray-700 text-sm light">
                상품을 추가해보세요.
              </p>
              <button
                className="text-sm border p-1 rounded-md mt-3"
                onClick={() => setCartOrFavorite("favorite")}
              >
                좋아요한 상품 보기
              </button>
              <MostPopular />
            </div>
          )}
        </>
      )}
    </div>
  );
}
