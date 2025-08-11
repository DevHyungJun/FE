import { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import ProductDetailAccordion from "./ProductDetailAccordion";
import ProductReviewTab from "./ProductReviewTab";
import { PostData } from "@/types/Product";
import useGetReview from "@/hooks/useGetReview";
import { ORDERING_OPTIONS } from "@/constants/review";

interface ProductTabsProps {
  data: { data: PostData };
  id: string;
}

export default function ProductTabs({ data, id }: ProductTabsProps) {
  const [orderOption, setOrderOption] = useState(ORDERING_OPTIONS[0].value);
  const { data: reviewData, isLoading: reviewLoading } = useGetReview(
    id,
    orderOption
  );

  return (
    <Tabs
      variant="underlined"
      className="w-full bold sticky top-[64px] z-20 bg-background/70 backdrop-blur-lg backdrop-saturate-150 border-divider"
    >
      <Tab key="productDetail" title="정보" textValue="productDetail">
        <ProductDetailAccordion data={data} />
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
        />
      </Tab>
    </Tabs>
  );
}
