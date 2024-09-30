'use client';

type ParamsId = {id: string};
import useDetail from "@/hooks/useDetail";
import { Button, Image } from "@nextui-org/react";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function productDetail({params}: {params: ParamsId}) {
  const { id } = params;
  const { data, isLoading, isError, error } = useDetail(id);
  const [quantity, setQuantity] = useState(1);

  if(isLoading) return <div>Loading...</div>;

  const minusQuantity = () => {
    if(quantity > 1) {
      setQuantity(quantity-1);
    }
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    <div className="flex flex-col max-w-[1200px] mx-auto p-1">
      <div className="flex justify-around gap-2 mt-5 md:gap-10">
        <Image 
          src={data?.data?.product.images[0]}
          alt={data?.data?.title}
          width={500}
        />
        <div className="flex flex-col gap-1.5 md:gap-3">
          <h2 className="text-medium md:text-2xl font-semibold text-gray-800">{data?.data?.title}</h2>
          <p className="text-sm md:text-medium text-gray-500">{formatDate(data?.data?.createdAt)}</p>
          <p className="text-sm md:text-medium">{data?.data?.product.price}원</p>
          <p className="text-xs md:text-sm">현재 {data?.data?.product.stock_quantity}개의 수량이 남았습니다.</p>
          <div>
            <p className="text-xs md:text-sm">선택된 수량: {quantity}</p>
          </div>
          <div className="flex justify-center gap-3">
            <Button 
              onClick={minusQuantity}
            >
              <FiMinus className="text-sm md:text-medium" />
            </Button>
            <Button 
              onClick={()=>setQuantity(quantity+1)}
            >
              <FiPlus className="text-sm md:text-medium" />
            </Button>
          </div>
          <Button color="primary" className="text-xs md:text-medium">구매하기</Button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-center mt-10 mb-3">제품 상세 정보</h2>
        <p>{data?.data?.detail_images.map((img: any)=> (
          <Image 
            key={img}
            src={img}
            alt={data?.data?.title}
            width={800}
          />
        ))}</p>
      </div>
    </div>
  )
}