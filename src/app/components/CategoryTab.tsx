import useGetCategory from "@/hooks/useGetCategory";
import { CategoryItem } from "@/types/category";
import { Tab, Tabs } from "@nextui-org/react";

interface CategoryTabProps {
  setSelectedCategory: (selectedCategory: string) => void;
}

const CategoryTab = ({ setSelectedCategory }: CategoryTabProps) => {
  const { data: category } = useGetCategory();
  const handleTabs = (key: React.Key) => setSelectedCategory(key as string);
  return (
    <div className="sticky top-[64px] z-20 py-1 mb-3 overflow-x-scroll scrollbar-hide border-b bg-background/70 backdrop-blur-lg backdrop-saturate-150 border-divider">
      <Tabs
        variant="underlined"
        onSelectionChange={handleTabs}
        size="lg"
        color="primary"
      >
        <Tab title="전체" key="" />
        {category?.data?.map((category: CategoryItem) => (
          <Tab
            key={category._id}
            title={category.category}
            value={category._id}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default CategoryTab;
