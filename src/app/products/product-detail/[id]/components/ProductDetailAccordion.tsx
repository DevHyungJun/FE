"use client";
import React from "react";
import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import formatDate from "@/util/formatDate";

interface ProductDetailAccordionProps {
  detailImages: string[];
  title: string;
  createdAt: string;
}

export default function ProductDetailAccordion({
  detailImages,
  title,
  createdAt,
}: ProductDetailAccordionProps) {
  return (
    <Accordion
      className="border-y"
      fullWidth={true}
      defaultExpandedKeys={["detail"]}
    >
      <AccordionItem
        key="detail"
        textValue="detail"
        startContent={<div className="bold">제품 상세 정보 보기</div>}
      >
        <div className="flex flex-col max-w-[900px] mx-auto items-center mt-10">
          <p className="text-xs md:text-medium text-gray-500 mb-5 light">
            {formatDate(createdAt)}에 등록된 상품입니다.
          </p>
          {detailImages.map((img, i) => (
            <Image key={i} src={img} alt={title} width={800} />
          ))}
        </div>
      </AccordionItem>
    </Accordion>
  );
}
