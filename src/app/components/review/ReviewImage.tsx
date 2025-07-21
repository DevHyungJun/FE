"use client";

import Image from "next/image";
import { useState } from "react";

interface ReviewImageProps {
  images: string[];
}

const IMAGE_SIZE = {
  small: 100,
  large: 500,
};

export default function ReviewImage({ images }: ReviewImageProps) {
  const [fullsize, setFullsize] = useState(false);
  const imgSize = fullsize ? IMAGE_SIZE.large : IMAGE_SIZE.small;

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`flex ${fullsize ? "flex-col" : "flex-row"} gap-1 mt-10`}>
      {images.map((img: string) => (
        <Image
          src={img}
          key={img}
          alt="Review Image"
          width={imgSize}
          height={imgSize}
          className="rounded-md object-cover cursor-pointer"
          onClick={() => setFullsize((prev) => !prev)}
        />
      ))}
    </div>
  );
}
