import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Image } from "@nextui-org/react";
import { PostData } from "@/types/Product";

interface ProductImageSliderProps {
  data: { data: PostData };
}

export default function ProductImageSlider({ data }: ProductImageSliderProps) {
  const [onlyOneImage, setOnlyOneImage] = useState(false);
  const images = data?.data?.product?.images;
  const title = data?.data?.title;

  useEffect(() => {
    if (data?.data?.product?.images.length === 1) {
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
