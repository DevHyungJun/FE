"use client";

import useGetCart from "@/hooks/useGetCart";
import CartProductDetail from "../components/cartProductDetail";
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
    "flex items-center gap-1 text-lg md:text-2xl extra-bold m-1 text-gray-900 border-b-4 p-2 hover:opacity-100";
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
              <div className="mt-40 border-t-2">
                <h2 className="text-lg bold mt-2">이런 상품은 어떠세요?</h2>
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
                <Button color="primary" className="w-full bold">
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
