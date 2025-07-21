import React from "react";
import { Checkbox } from "@nextui-org/react";

interface CartActionsProps {
  isAllSelected: boolean;
  cartItemCount: number;
  handleSelectAll: () => void;
  handleRemoveSelected: () => void;
}

const CartActions: React.FC<CartActionsProps> = ({
  isAllSelected,
  cartItemCount,
  handleSelectAll,
  handleRemoveSelected,
}) => (
  <>
    <h2 className="text-lg bold mb-5">장바구니 상품 {cartItemCount}개</h2>
    <div className="flex justify-between">
      <Checkbox isSelected={isAllSelected} onChange={handleSelectAll}>
        <p className="text-sm bold">전체 선택</p>
      </Checkbox>
      <button className="mr-1" onClick={handleRemoveSelected}>
        <p className="text-sm bold">선택 삭제</p>
      </button>
    </div>
  </>
);

export default CartActions;
