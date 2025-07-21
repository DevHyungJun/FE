"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import useGuestOut from "@/hooks/useGuestOut";
import { useCart } from "./hooks/useCart";
import CartHeader from "./components/CartHeader";
import FavoriteView from "./components/FavoriteView";
import EmptyCart from "./components/EmptyCart";
import CartView from "./components/CartView";

export default function Cart() {
  useGuestOut();
  const {
    items,
    setItems,
    cartData,
    likeList,
    cartOrFavorite,
    selectedItems,
    totalPrice,
    isAllSelected,
    isLoading,
    isOrdering,
    setCartOrFavorite,
    handleSelectAll,
    handleItemSelect,
    handleRemoveSelected,
    handleOrder,
  } = useCart();

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (cartOrFavorite === "favorite") {
      return (
        <FavoriteView
          likeList={likeList?.data?.articles}
          setCartOrFavorite={setCartOrFavorite}
        />
      );
    }

    if (!cartData?.article_list || cartData.article_list.length === 0) {
      return <EmptyCart setCartOrFavorite={setCartOrFavorite} />;
    }

    return (
      <CartView
        items={items}
        setItems={setItems}
        isAllSelected={isAllSelected}
        totalPrice={totalPrice}
        isOrdering={isOrdering}
        selectedItems={selectedItems}
        cartItemCount={cartData.article_list.length}
        handleSelectAll={handleSelectAll}
        handleItemSelect={handleItemSelect}
        handleRemoveSelected={handleRemoveSelected}
        handleOrder={handleOrder}
      />
    );
  };

  return (
    <div className="flex flex-col gap-5 max-w-[1280px] mx-auto p-1 overflow-x-hidden">
      <CartHeader
        cartOrFavorite={cartOrFavorite}
        setCartOrFavorite={setCartOrFavorite}
      />
      {renderContent()}
    </div>
  );
}
