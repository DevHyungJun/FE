'use client';

import React, { useEffect, useState } from 'react';
import useDetail from "@/hooks/useDetail";
import { Button, Image } from "@nextui-org/react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Slider from "react-slick";
import formatPrice from '@/util/formatPrice';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import formatDate from '@/util/formatDate';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import useFavoritePost from '@/hooks/useFavoritePost';
import useFavoriteDelete from '@/hooks/useFavoriteDelete';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type ParamsId = { id: string };
type AuthCheckResponse = {
  code: number;
  data: {
    email: string;
    isLoggedIn: boolean;
    role: string;
    userId: string;
    username: string;
    message: string;
  };
};

export default function ProductDetail({ params }: { params: ParamsId }) {
  const { id } = params;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading, isError, error } = useDetail(id);
  const { mutate: favoritePostMutate } = useFavoritePost();
  const { mutate: favoriteDeleteMutate } = useFavoriteDelete();
  const [quantity, setQuantity] = useState(1);
  const [onlyOneImage, setOnlyOneImage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const cachedData = queryClient.getQueryData<AuthCheckResponse>(['authCheck']);
  const isLoggedIn = cachedData?.data?.isLoggedIn;

  useEffect(() => {
    if (data?.data?.product?.images.length === 1) {
      setOnlyOneImage(true);
    } else {
      setOnlyOneImage(false);
    }

    if (!isLoggedIn) return;
    if (data?.data?.like_user_list.includes(cachedData?.data?.userId)) {
      setIsFavorite(true);
    }
  }, [data]);

  const handleFavorite = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'error',
        title: '좋아요',
        text: '로그인이 필요한 서비스입니다.',
      });
      router.push('/login');
      return;
    }
    if (isFavorite) {
      favoriteDeleteMutate(id, {
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: '좋아요',
            text: '상품을 좋아요 목록에서 삭제했습니다.',
            showConfirmButton: false,
            timer: 1500
          });
          queryClient.invalidateQueries({queryKey: ['allProducts']});
          setIsFavorite(false);
        },
        onError: () => {
          Swal.fire({
            icon: 'error',
            title: '좋아요',
            text: '상품을 좋아요 목록에서 삭제하지 못했습니다.',
          });
        }
      })
    } else {
      favoritePostMutate(id, {
        onSuccess: () => {
          Swal.fire({
            icon: 'success',
            title: '좋아요',
            text: '상품을 좋아요 목록에 추가했습니다.',
            showConfirmButton: false,
            timer: 1500
          });
          queryClient.invalidateQueries({queryKey: ['allProducts']});
          setIsFavorite(true);
        },
        onError: () => {
          Swal.fire({
            icon: 'error',
            title: '좋아요',
            text: '상품을 좋아요 목록에 추가하지 못했습니다.',
          });
        }
      })
    }
  };

  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const settings = {
    arrows: false,
    dots: !onlyOneImage,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  return (
    <>
      {isLoading ? <LoadingSpinner /> : (
        <div className="max-w-[1200px] mx-auto px-1">
          <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-10">
            <div className="w-full md:w-1/2">
              <Slider {...settings} className='mb-5'>
                {data?.data?.product?.images.map((img: string, i: number) => (
                  <div key={i}>
                    <Image
                      src={img}
                      width='100%'
                      alt={data?.data?.title}
                      className="mx-auto object-contain max-h-[400px] md:max-h-[600px]"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center gap-3 pt-0 md:pt-32">
              <h2 className="text-center text-xl font-semibold text-gray-800">{data?.data?.title}</h2>
              <p className="text-md font-semibold">
                {formatPrice(data?.data?.product?.price)}
              </p>
              <div>
                <p className="text-sm">선택된 수량: {quantity}</p>
              </div>
              <div className="flex justify-start gap-3">
                <Button onClick={minusQuantity}>
                  <FiMinus className="text-sm md:text-medium" />
                </Button>
                <Button onClick={() => setQuantity(quantity + 1)}>
                  <FiPlus className="text-sm md:text-medium" />
                </Button>
              </div>
              <Button color="primary" className="w-[300px] text-xs md:text-medium mt-2">구매하기</Button>
              <p className="text-sm text-yellow-600">현재 {data?.data?.product?.stock_quantity}개의 수량이 남았습니다.</p>
              <button
                className='text-4xl text-red-600'
                onClick={handleFavorite}
              >
                {isFavorite ? <IoHeartSharp /> : <IoHeartOutline />}
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center mt-10 border-2 rounded-md">
            <div className='flex flex-col gap-3 text-center m-20'>
              <p className="text-xs md:text-medium text-gray-500">{formatDate(data?.data?.createdAt)}에 등록된 상품입니다.</p>
              <h2 className="text-xl font-semibold">제품 상세 정보</h2>
            </div>
            {data?.data?.detail_images.map((img: string, i: number) => (
              <Image
                key={i}
                src={img}
                alt={data?.data?.title}
                width={800}
              />
            ))}
          </div>
        </div>
      )
      }
    </>
  );
}