'use client'
// 이미지 캐러셀 React slick으로 바꿔서 구현하기 현재 브랜치:feature-#4
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ImgCarousel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(()=> {
    const checkMobile = () => setIsMobile(window.innerWidth < 800);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const image = [
    {
      src: '/home_main1.webp',
      miniSrc: '/home_main1_mini.webp',
      alt: 'image1',
      bg: '#C37B14'
    },
    {
      src: '/home_main2.webp',
      miniSrc: '/home_main2_mini.webp',
      alt: 'image2',
      bg: '#5F9588'
    },
    {
      src: '/home_main3.webp',
      miniSrc: '/home_main3_mini.webp',
      alt: 'image3',
      bg: '#E4E1D7'
    }
  ];

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    prevArrow: <IoIosArrowBack />,
    nextArrow: <IoIosArrowForward />
  };

  return (
    <Slider {...settings}>
      {image.map((img) => (
        <div 
          key={img.src} 
          className={`relative w-full ${isMobile ? 'h-[300px]' : 'h-[380px]'}`}
        >
          <Image 
            src={isMobile ? img.miniSrc : img.src}
            alt={img.alt}
            objectFit="contain"
            fill
            sizes="100vw"
            loading="lazy"
            className="cursor-pointer" 
            style={{background: img.bg}}
          />
        </div>
      ))}
    </Slider>
  )
}
