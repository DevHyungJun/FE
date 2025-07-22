import { useState } from "react";

export function useProductSelect() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedProduct(e.target.value);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedCategory(e.target.value);

  return {
    selectedProduct,
    setSelectedProduct,
    selectedCategory,
    setSelectedCategory,
    handleSelectChange,
    handleCategoryChange,
  };
}
