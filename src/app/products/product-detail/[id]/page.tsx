"use client";

import useDetail from "@/hooks/useDetail";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ScrollUpButton from "@/app/components/ScrollUpButton";
import ProductImageSlider from "./components/ProductImageSlider";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";

interface ParamsId {
  id: string;
}

export default function ProductDetail({ params }: { params: ParamsId }) {
  const { id } = params;
  const { data, isLoading } = useDetail(id);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-10">
            <div className="w-full md:w-1/2">
              <ProductImageSlider data={data} />
            </div>
            <ProductInfo id={id} data={data} />
          </div>
          <ProductTabs id={id} data={data} />
          <ScrollUpButton />
        </div>
      )}
    </>
  );
}
