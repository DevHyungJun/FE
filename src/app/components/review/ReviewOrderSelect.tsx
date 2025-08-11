import { Select, SelectItem } from "@nextui-org/react";
import { ORDERING_OPTIONS } from "@/constants/review";
import { ReviewData } from "@/types/review";

const ReviewOrderSelect = ({
  orderOption,
  setOrderOption,
  userReview,
}: {
  orderOption: string;
  setOrderOption: (value: string) => void;
  userReview: { data: ReviewData[] };
}) => {
  return (
    <div
      className={`flex justify-end ${
        userReview?.data.length === 0 && "hidden"
      }`}
    >
      <Select
        aria-label="정렬"
        disallowEmptySelection
        items={ORDERING_OPTIONS}
        label="정렬"
        className="w-[100px] bold"
        variant="underlined"
        defaultSelectedKeys={["updatedAt"]}
        selectedKeys={[String(orderOption)]}
        onChange={(e) => setOrderOption(e.target.value)}
      >
        {(item) => (
          <SelectItem key={item.value} value={item.label}>
            {item.label}
          </SelectItem>
        )}
      </Select>
    </div>
  );
};

export default ReviewOrderSelect;
