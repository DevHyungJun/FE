'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoDot } from "react-icons/go";
import { GoDotFill } from "react-icons/go";

export default function ImgCarousel() {
  const [iNum, setINum] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the width on mount

    const interval = setInterval(() => {
      setINum((prev) => (prev + 1) % image.length);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  const currentImage = image[iNum];

  const handlePrevOrNext = (state: string) => {
    if (state === 'next') {
      setINum((prev) => (prev + 1) % image.length);
      return;
    };
    setINum((prev) => (prev - 1 + image.length) % image.length);
  };
  
  return (
    <div className="relative w-full h-[300px] xl:h-[480px]">
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 text-6xl"
        onClick={() => handlePrevOrNext('prev')}
      >
        <MdKeyboardArrowLeft className="hidden sm:block" />
      </button>

      <div className='relative w-full h-full'
        style={{ background: currentImage.bg }}
      >
        <Image src={windowWidth < 800 ? image[iNum].miniSrc : image[iNum].src}
          key={currentImage.src}
          alt={image[iNum].alt}
          objectFit="contain"
          objectPosition="top"
          fill
          loading="eager"
          className="transition-opacity duration-500 cursor-pointer" />
      </div>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 text-6xl"
        onClick={() => handlePrevOrNext('next')}
      >
        <MdKeyboardArrowRight className="hidden sm:block" />
      </button>
      <div>
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {image.map((_, index) => (
            index === iNum ? (
              <GoDotFill
                className="cursor-pointer"
                key={index}
              />
            ) : (
              <GoDot
                key={index}
                className="cursor-pointer"
                onClick={() => setINum(index)}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
}
