import { Button, Image } from "@nextui-org/react";
import { PostData } from "../../../types/Product";
import Link from "next/link";
import formatPrice from "@/util/formatPrice";
import { IoIosClose } from "react-icons/io";
import useFavoriteDelete from "@/hooks/useFavoriteDelete";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import useAddCart from "@/hooks/useAddCart";

interface FavoriteProps {
  likeList: PostData[];
  setCartOrFavorite: (value: string) => void;
};

interface Quantity {
  quantity: number;
  id: string;
};

export default function Favorite({ likeList, setCartOrFavorite }: FavoriteProps) {
  const queryClient = useQueryClient();
  const { mutate: favoriteDeleteMutate } = useFavoriteDelete();
  const [quantity, setQuantity] = useState<Quantity[]>();
  const { mutate: addCartMutate, isPending: addCartIspending } = useAddCart();

  useEffect(() => {
    if (likeList) {
      const quantityList = likeList.map((item) => {
        return {
          quantity: 1,
          id: item._id
        }
      });
      setQuantity(quantityList);
    }
  }, [likeList]);

  const handleDelteFavorite = (id: string) => {
    favoriteDeleteMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['allProducts'] });
        queryClient.invalidateQueries({ queryKey: ['likeList'] });
      },
      onError: () => {
        Swal.fire({
          icon: 'error',
          title: '좋아요',
          text: '상품을 좋아요 목록에서 삭제하지 못했습니다.',
        });
      }
    })
  };

  const handlePlus = (id: string) => {
    setQuantity((prev) => 
      prev?.map((item) => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const handleMinus = (id: string) => {
    setQuantity((prev) => 
      prev?.map((item) => 
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleAddCart = (id: string) => {
    const quantityValue = quantity?.find((item: any) => item.id === id)?.quantity;
    if (!quantityValue) return;
    addCartMutate({ article: id, quantity: quantityValue}, {
      onSuccess: () => {
        Swal.fire({
          text: `${quantityValue}개의 상품이 장바구니에 추가되었습니다.`,
          showConfirmButton: false,
          timer: 1000,
        });
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        setCartOrFavorite('cart');
      },
      onError: () => {
        Swal.fire({
          icon: 'error',
          title: '장바구니',
          text: '상품을 장바구니에 추가하지 못했습니다.',
        });
      }
    });
  };

  return (
    <>
      {likeList?.length !== 0 ? (
        <>
          <h2 className="text-lg font-semibold mb-5">
            좋아요한 상품 {likeList?.length}개
          </h2>
          {likeList?.map((likeItem: PostData) => (
            <div className="flex-grow border-b p-3 rounded-sm" key={likeItem?._id}>
              <div className="flex gap-3">
                <Link href={`/products/product-detail/${likeItem?._id}`}>
                  <Image width={100}
                    alt="product image"
                    src={likeItem?.product?.thumbnail}
                    className="rounded-md object-contain bg-gray-100"
                  />
                </Link>
                <div className="flex-grow space-y-2 text-sm">
                  <>
                    <div className="flex justify-between text-sm">
                      <Link href={`/products/product-detail/${likeItem?._id}`} className="hover:font-semibold">
                        <p className="text-xs md:text-sm">{likeItem?.product?.product_name}</p>
                      </Link>
                      <div className="flex gap-2">
                        <div className="flex flex-col gap-2 justify-center items-center">
                          <Button 
                            className="hover:text-blue-500 font-semibold w-[80px] md:w-[100px]"
                            onClick={()=>handleAddCart(likeItem?._id)} 
                            variant="bordered"
                            isLoading={addCartIspending}
                            size="sm"
                          >
                            <p className="text-xs md:text-sm">장바구니 담기</p>
                          </Button>
                          <div className="flex gap-1.5 md:gap-3 items-center rounded-sm">
                            <button className='p-1 md:p-2 border hover:bg-gray-50 rounded-md' 
                            onClick={()=>handleMinus(likeItem?._id)}>
                              <FiMinus className="text-xs md:text-medium" />
                            </button>
                            <p className='text-xs md:text-sm'>
                              {quantity?.find((item) => item.id === likeItem._id)?.quantity}
                            </p>
                            <button className='p-1 md:p-2 border hover:bg-gray-50 rounded-md' 
                            onClick={()=>handlePlus(likeItem?._id)}>
                              <FiPlus className="text-xs md:text-medium" />
                            </button>
                          </div>
                        </div>
                        <button className="text-2xl md:text-3xl mt-0.5"
                          onClick={() => handleDelteFavorite(likeItem?._id)}><IoIosClose /></button>
                      </div>
                    </div>
                    <p className="font-semibold">
                      {formatPrice(likeItem?.product?.price)}
                    </p>
                  </>
                </div>
              </div>
            </div>
          ))
          }
        </>
      ) : (
        <div className="flex flex-col items-center gap-3 mt-10">
          <h2 className="text-lg font-semibold m-1">좋아요한 상품이 없습니다.</h2>
          <p className="text-gray-700 text-sm">상품을 추가해보세요.</p>
          <button className="text-sm border p-1 rounded-md mt-3" onClick={() => setCartOrFavorite('cart')}>장바구니 살펴보기</button>

          <div className="mt-40 border-t-2">
            <h2 className="text-lg font-semibold mt-2">이런 상품은 어떠세요?</h2>
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
  );
}