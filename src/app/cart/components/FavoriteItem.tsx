import React from "react";
import Link from "next/link";
import { Button, Image } from "@nextui-org/react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import formatPrice from "@/util/formatPrice";
import { PostData } from "@/types/Product";

interface FavoriteItemProps {
  item: PostData;
  quantity: number;
  isAddingToCart: boolean;
  onDelete: (id: string) => void;
  onUpdateQuantity: (id: string, amount: number) => void;
  onAddCart: (id: string) => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({
  item,
  quantity,
  isAddingToCart,
  onDelete,
  onUpdateQuantity,
  onAddCart,
}) => (
  <div className="flex-grow border-b p-3 rounded-sm">
    <div className="flex gap-3">
      <Link href={`/products/product-detail/${item?._id}`}>
        <Image
          width={100}
          alt="product image"
          src={item?.product?.thumbnail}
          className="rounded-md object-contain bg-gray-100"
        />
      </Link>
      <div className="flex-grow space-y-2 text-sm">
        <div className="flex justify-between text-sm">
          <Link
            href={`/products/product-detail/${item?._id}`}
            className="hover:font-semibold"
          >
            <p className="text-xs md:text-sm">{item?.product?.product_name}</p>
          </Link>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2 justify-center items-center">
              <Button
                className="bold w-[80px] md:w-[100px]"
                onClick={() => onAddCart(item?._id)}
                color="primary"
                isLoading={isAddingToCart}
                size="sm"
              >
                <p className="text-xs md:text-sm">장바구니 담기</p>
              </Button>
              <div className="flex gap-1.5 md:gap-3 items-center rounded-sm">
                <button
                  className="p-1 md:p-2 border hover:bg-gray-50 rounded-md"
                  onClick={() => onUpdateQuantity(item?._id, -1)}
                >
                  <FiMinus className="text-xs md:text-medium" />
                </button>
                <p className="text-xs md:text-sm">{quantity}</p>
                <button
                  className="p-1 md:p-2 border hover:bg-gray-50 rounded-md"
                  onClick={() => onUpdateQuantity(item?._id, 1)}
                >
                  <FiPlus className="text-xs md:text-medium" />
                </button>
              </div>
            </div>
            <button
              className="text-2xl md:text-3xl mt-0.5"
              onClick={() => onDelete(item?._id)}
            >
              <IoIosClose />
            </button>
          </div>
        </div>
        <p className="bold">{formatPrice(item?.product?.price)}</p>
      </div>
    </div>
  </div>
);

export default FavoriteItem;
