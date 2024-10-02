'use client';

import React, { useEffect, useState } from 'react';
import useDetail from "@/hooks/useDetail";
import { Button, Image } from "@nextui-org/react";
import { FiMinus, FiPlus } from "react-icons/fi";
import Slider from "react-slick";
import formatPrice from '@/api/formatPrice';
import LoadingSpinner from '@/app/components/LoadingSpinner';

type ParamsId = { id: string };

export default function ProductDetail({ params }: { params: ParamsId }) {
  const { id } = params;
  const { data, isLoading, isError, error } = useDetail(id);
  const [quantity, setQuantity] = useState(1);
  const [onlyOneImage, setOnlyOneImage] = useState(false);

  useEffect(() => {
    if (data?.data?.product.images.length === 1) {
      setOnlyOneImage(true);
    } else {
      setOnlyOneImage(false);
    }
  }, [data]);

  const settings = {
    arrows: false,
    dots: !onlyOneImage,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <>
      {isLoading ? <LoadingSpinner /> : (
        <div className="max-w-[1200px] mx-auto px-1">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="w-full md:w-1/2">
              <Slider {...settings} className="w-full">
                {data?.data?.product.images.map((img: string) => (
                  <div key={img} className="w-full aspect-square">
                    <Image
                      src={img}
                      alt={data?.data?.title}
                      className="w-full object-cover"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center gap-3 pt-0 md:pt-32">
              <h2 className="text-xl font-semibold text-gray-800">{data?.data?.title}</h2>
              <p className="text-md font-semibold">
                {formatPrice(data?.data?.product.price)}
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
              <p className="text-sm text-yellow-600">현재 {data?.data?.product.stock_quantity}개의 수량이 남았습니다.</p>
            </div>
          </div>
          <div className="flex flex-col items-center mt-10 border-2 rounded-md">
            <div className='flex flex-col gap-3 text-center m-20'>
              <p className="text-xs md:text-medium text-gray-500">{formatDate(data?.data?.createdAt)}에 등록된 상품입니다.</p>
              <h2 className="text-xl font-semibold">제품 상세 정보</h2>
            </div>
            {data?.data?.detail_images.map((img: string) => (
              <Image
                key={img}
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