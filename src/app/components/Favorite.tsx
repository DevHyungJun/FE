import { Button, Image } from "@nextui-org/react";
import { PostData } from "../../../types/Product";
import Link from "next/link";
import formatPrice from "@/util/formatPrice";
import { IoIosClose } from "react-icons/io";
import useFavoriteDelete from "@/hooks/useFavoriteDelete";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

interface FavoriteProps {
  likeList: PostData[];
}

export default function Favorite({ likeList }: FavoriteProps) {
  const queryClient = useQueryClient();
  const { mutate: favoriteDeleteMutate } = useFavoriteDelete();

  const handleDelteFavorite = (id: string) => {
    favoriteDeleteMutate(id, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: '좋아요',
          text: '상품을 좋아요 목록에서 삭제했습니다.',
        });
        // queryClient.invalidateQueries({ queryKey: ['allProducts'] });
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
                    <div className="flex justify-between">
                      <Link href={`/products/product-detail/${likeItem?._id}`}>
                        <p>{likeItem?.product?.product_name}</p>
                      </Link>
                      <div className="flex gap-2">
                        <button className="hover:text-blue-500 font-semibold">장바구니 담기</button>
                        <button className="text-3xl mt-0.5" 
                          onClick={()=>handleDelteFavorite(likeItem?._id)}><IoIosClose /></button>
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
          <button className="text-sm border p-1 rounded-md mt-3">장바구니 살펴보기</button>

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