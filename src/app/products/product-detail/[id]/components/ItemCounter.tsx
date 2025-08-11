import { MAX_QUANTITY, MIN_QUANTITY } from "@/constants/review";
import { FiMinus, FiPlus } from "react-icons/fi";

interface ItemCounterProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ItemCounter = ({ quantity, setQuantity }: ItemCounterProps) => {
  const handleMinus = () => {
    if (quantity > MIN_QUANTITY) {
      setQuantity(quantity - 1);
    }
  };
  const handlePlus = () => {
    if (quantity >= MAX_QUANTITY) return;
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex gap-3 items-center rounded-sm">
      <button
        onClick={handleMinus}
        className="p-2 border hover:bg-gray-50 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
        disabled={quantity <= MIN_QUANTITY}
      >
        <FiMinus className="text-sm md:text-medium" />
      </button>
      <p className="text-sm">{quantity}</p>
      <button
        onClick={handlePlus}
        className="p-2 border hover:bg-gray-50 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
        disabled={quantity >= MAX_QUANTITY}
      >
        <FiPlus className="text-sm md:text-medium" />
      </button>
    </div>
  );
};

export default ItemCounter;
