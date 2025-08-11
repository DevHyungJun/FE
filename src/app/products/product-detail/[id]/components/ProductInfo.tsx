"use client";

import { useState } from "react";
import formatPrice from "@/util/formatPrice";
import { MIN_QUANTITY } from "@/constants/review";
import { PostData } from "@/types/Product";
import ItemCounter from "./ItemCounter";
import BuyButton from "./BuyButton";
import AddCartButton from "./AddCartButton";
import FavoriteButton from "./FavoriteButton";

interface ProductInfoProps {
  id: string;
  data: { data: PostData };
}

export default function ProductInfo({ id, data }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(MIN_QUANTITY);

  return (
    <div className="w-full md:w-1/2 flex flex-col items-center gap-3 pt-0 md:pt-32">
      <h2 className="text-center text-xl extra-bold text-gray-800">
        {data?.data?.title}
      </h2>
      <p className="text-md bold">{formatPrice(data?.data?.product?.price)}</p>
      <ItemCounter quantity={quantity} setQuantity={setQuantity} />
      <div className="flex-col md:flex items-center gap-1">
        <BuyButton data={data} quantity={quantity} />
        <div className="w-full flex justify-end gap-2">
          <AddCartButton data={data} quantity={quantity} />
          <FavoriteButton id={id} data={data} />
        </div>
      </div>
    </div>
  );
}
