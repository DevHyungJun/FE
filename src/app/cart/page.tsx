"use client";

import useGuestOut from "@/hooks/useGuestOut";
import CartHeader from "./components/CartHeader";
import FavoriteView from "./components/FavoriteView";
import CartView from "./components/CartView";
import { useState } from "react";

export default function Cart() {
  useGuestOut();
  const [cartOrFavorite, setCartOrFavorite] = useState<"cart" | "favorite">(
    "cart"
  );

  return (
    <div className="flex flex-col gap-5 max-w-[1280px] mx-auto p-1 overflow-x-hidden">
      <CartHeader
        cartOrFavorite={cartOrFavorite}
        setCartOrFavorite={setCartOrFavorite}
      />
      {cartOrFavorite === "favorite" ? (
        <FavoriteView
          cartOrFavorite={cartOrFavorite}
          setCartOrFavorite={setCartOrFavorite}
        />
      ) : (
        <CartView
          cartOrFavorite={cartOrFavorite}
          setCartOrFavorite={setCartOrFavorite}
        />
      )}
    </div>
  );
}
