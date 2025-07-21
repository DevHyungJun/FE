import { Select, SelectItem } from "@nextui-org/react";
import { Product } from "@/types/Product";

interface ProductSelectProps {
  items: Product[];
  selectedProduct: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ProductSelect({
  items,
  selectedProduct,
  onChange,
}: ProductSelectProps) {
  return (
    <Select
      items={items}
      label="상품"
      placeholder="상품을 선택하세요"
      onChange={onChange}
      selectedKeys={selectedProduct ? [selectedProduct] : []}
    >
      {items?.map((item: Product) => (
        <SelectItem
          key={item._id}
          value={item._id}
          textValue={item.product_name}
        >
          {item.product_name}
        </SelectItem>
      ))}
    </Select>
  );
}
