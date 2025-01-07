"use client";

import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import formatPrice from "@/util/formatPrice";

export default function MostPopular() {
  // 화면 width가 800px 이하라면 모바일로 판단
  const [isMobile, setIsMobile] = useState(false);
  // 화면 width가 변경될 때마다 모바일 여부 확인
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 570);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 데모 인기 상품 정보
  const mostPopularProducts = [
    {
      src: "/mostPopular_img1.webp",
      alt: "image1",
      brand: "Nike",
      Ename:
        "Nike x Peaceminusone Air Force 1 Low Para-Noise 3.0 Black and Multicolor",
      Kname:
        "나이키 x 피스마이너스원 에어포스 1 로우 파라노이즈 3.0 블랙 앤 멀티컬러",
      price: 303000,
    },
    {
      src: "/mostPopular_img2.webp",
      alt: "image2",
      brand: "Adidas",
      Ename: "Adidas Waffle Beckenbauer Track Top Wonder White - KR Sizing",
      Kname: "아디다스 와플 베큰바워 트랙 탑 원더 화이트 - KR 사이즈",
      price: 130000,
    },
    {
      src: "/mostPopular_img3.webp",
      alt: "image3",
      brand: "Nike",
      Ename: "Nike Air Force 1 '07 WB Flax'",
      Kname: "나이키 에어포스 1 '07 WB 플랙스'",
      price: 150000,
    },
    {
      src: "/mostPopular_img4.webp",
      alt: "image4",
      brand: "Apple",
      Ename: "Apple AirPods Max Silver (Korean Ver.)",
      Kname: "애플 에어팟 맥스 실버 (국내 정식 발매 제품)",
      price: 600000,
    },
    {
      src: "/mostPopular_img5.webp",
      alt: "image5",
      brand: "Asics",
      Ename: "Asics Gel-Kayano 14 Cream Black",
      Kname: "아식스 젤 카야노 14 크림 블랙",
      price: 206000,
    },
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 250,
    slidesToScroll: isMobile ? 2.5 : 0,
    slidesToShow: isMobile ? 2.5 : mostPopularProducts.length,
    draggable: isMobile ? true : false,
  };

  return (
    <>
      <div className="flex flex-col max-w-[1200px] gap-3 mx-auto mt-10 p-1">
        <div className="flex flex-col pl-1">
          <h2 className="extra-bold mt-5 text-xl">Most Popular</h2>
          <p className="text-gray-500">인기 상품</p>
        </div>
        <div>
          <Slider {...settings}>
            {mostPopularProducts.map((product) => (
              <div
                key={product.price}
                className="flex flex-col justify-between gap-2 w-[300px] text-sm text-gray-800 p-1 cursor-pointer"
              >
                <Image
                  src={product.src}
                  alt={product.alt}
                  width={300}
                  className="bg-gray-100 rounded-md"
                />
                <p className="bold">{product.brand}</p>
                <p className="text-xs two-line-ellipsis h-[32px]">
                  {product.Ename}
                </p>
                <p className="bold">{formatPrice(product.price)}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button className="border px-8 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-100">
          더보기
        </button>
      </div>
    </>
  );
}
