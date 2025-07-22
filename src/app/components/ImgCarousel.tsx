"use client";

import Image from "next/image";
import Slider from "react-slick";
import { image } from "@/constants/ImgCarousel";
import { getCarouselSettings } from "@/constants/getCarouselSettings";
import useCheckMobile from "@/hooks/useCheckMobile";

export default function ImgCarousel() {
  const { isMobile } = useCheckMobile();
  const settings = getCarouselSettings();

  return (
    <Slider {...settings}>
      {image.map((img) => (
        <div
          key={img.src}
          className={`relative w-full ${isMobile ? "h-[300px]" : "h-[380px]"}`}
        >
          <Image
            src={isMobile ? img.miniSrc : img.src}
            alt={img.alt}
            fill
            sizes="100vw"
            loading="lazy"
            className="cursor-pointer"
            style={{ background: img.bg, objectFit: "contain" }}
          />
        </div>
      ))}
    </Slider>
  );
}
