import { Select, SelectItem } from "@nextui-org/react";
import { CategoryItem } from "@/types/category";

interface CategorySelectProps {
  items: CategoryItem[];
  selectedCategory: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function CategorySelect({
  items,
  selectedCategory,
  onChange,
}: CategorySelectProps) {
  return (
    <Select
      items={items}
      label="카테고리"
      placeholder="카테고리를 선택하세요"
      onChange={onChange}
      selectedKeys={selectedCategory ? [selectedCategory] : []}
    >
      {items?.map((item: CategoryItem) => (
        <SelectItem key={item._id} value={item._id} textValue={item.category}>
          {item.category}
        </SelectItem>
      ))}
    </Select>
  );
}
