"use client";

import useGuestOut from "@/hooks/useGuestOut";
import CartHeader from "./components/CartHeader";
import FavoriteView from "./components/FavoriteView";
import CartView from "./components/CartView";
import { useState } from "react";

export default function Cart() {
  useGuestOut();
  const [cartOrFavorite, setCartOrFavorite] = useState("cart");

  return (
    <div className="flex flex-col gap-5 max-w-[1280px] mx-auto p-1 overflow-x-hidden">
      <CartHeader
        cartOrFavorite={cartOrFavorite}
        setCartOrFavorite={setCartOrFavorite}
      />
      {cartOrFavorite === "favorite" ? (
        <FavoriteView setCartOrFavorite={setCartOrFavorite} />
      ) : (
        <CartView setCartOrFavorite={setCartOrFavorite} />
      )}
    </div>
  );
}
