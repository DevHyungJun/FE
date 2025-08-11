import React from "react";
import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import formatDate from "@/util/formatDate";
import { PostData } from "@/types/Product";

interface ProductDetailAccordionProps {
  data: { data: PostData };
}

export default function ProductDetailAccordion({
  data,
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
            {formatDate(data?.data?.createdAt || "")}에 등록된 상품입니다.
          </p>
          {data?.data?.detail_images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={data?.data?.title || ""}
              width={800}
            />
          ))}
        </div>
      </AccordionItem>
    </Accordion>
  );
}
