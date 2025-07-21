import React from "react";
import Slider from "react-slick";
import { Image } from "@nextui-org/react";

interface ProductImageSliderProps {
  images: string[];
  title: string;
  onlyOneImage: boolean;
}

export default function ProductImageSlider({
  images,
  title,
  onlyOneImage,
}: ProductImageSliderProps) {
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
    <Slider {...settings} className="mb-5">
      {images.map((img, i) => (
        <div key={i}>
          <Image
            src={img}
            width="100%"
            alt={title}
            className="mx-auto object-contain"
          />
          <div className="flex justify-end text-gray-500 light text-sm">
            <p className="bg-gray-100 px-2 py-1 rounded-md">
              {i + 1} / {images.length}
            </p>
          </div>
        </div>
      ))}
    </Slider>
  );
}
