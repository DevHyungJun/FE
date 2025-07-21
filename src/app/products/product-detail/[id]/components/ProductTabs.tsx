import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import ProductDetailAccordion from "./ProductDetailAccordion";
import ProductReviewTab from "./ProductReviewTab";

interface ProductTabsProps {
  detailImages: string[];
  title: string;
  createdAt: string;
  id: string;
  reviewData: any;
  reviewLoading: boolean;
  orderOption: string;
  setOrderOption: (value: string) => void;
  authCheckData: any;
}

export default function ProductTabs({
  detailImages,
  title,
  createdAt,
  id,
  reviewData,
  reviewLoading,
  orderOption,
  setOrderOption,
  authCheckData,
}: ProductTabsProps) {
  return (
    <Tabs
      variant="underlined"
      className="w-full bold sticky top-[64px] z-20 bg-background/70 backdrop-blur-lg backdrop-saturate-150 border-divider"
    >
      <Tab key="productDetail" title="정보" textValue="productDetail">
        <ProductDetailAccordion
          detailImages={detailImages}
          title={title}
          createdAt={createdAt}
        />
      </Tab>
      <Tab
        key="review"
        title={`리뷰 ${reviewData?.data.length || ""}`}
        textValue="review"
      >
        <ProductReviewTab
          id={id}
          reviewData={reviewData}
          reviewLoading={reviewLoading}
          orderOption={orderOption}
          setOrderOption={setOrderOption}
          authCheckData={authCheckData}
        />
      </Tab>
    </Tabs>
  );
}
