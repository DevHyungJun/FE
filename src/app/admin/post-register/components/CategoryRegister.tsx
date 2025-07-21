import { Input, Button } from "@nextui-org/react";

interface CategoryRegisterProps {
  categoryShow: boolean;
  categoryName: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRegister: () => void;
  isLoading: boolean;
  onToggle: () => void;
}

export default function CategoryRegister({
  categoryShow,
  categoryName,
  onNameChange,
  onRegister,
  isLoading,
  onToggle,
}: CategoryRegisterProps) {
  return (
    <>
      <button type="button" onClick={onToggle}>
        <p className="text-sm hover:text-blue-500 bold">
          {categoryShow ? "숨기기" : "원하는 카테고리가 없다면? 등록하기"}
        </p>
      </button>
      {categoryShow && (
        <div className="flex flex-col items-end gap-2">
          <Input
            label="카테고리 이름"
            name="category"
            value={categoryName}
            onChange={onNameChange}
          />
          <Button
            type="button"
            className="w-1/2 bold"
            onClick={onRegister}
            isLoading={isLoading}
          >
            카테고리 등록
          </Button>
        </div>
      )}
    </>
  );
}
