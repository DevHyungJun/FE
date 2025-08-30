import useNewItem from "@/hooks/useNewItem";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import usePreviewEffect from "../../hooks/usePreviewEffect";

const useNewItemAction = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const newItem = useNewItem();
  const router = useRouter();
  usePreviewEffect(images, setPreviews);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("product_name", e.currentTarget.product_name.value);
    formData.append("price", e.currentTarget.price.value);
    formData.append("stock_quantity", e.currentTarget.stock_quantity.value);
    images.forEach((image, index) => {
      formData.append("images", image);
      if (index === 0) {
        formData.append("thumbnail", image);
      }
    });
    newItem.mutate(formData as FormData, {
      onSuccess: () => {
        router.push("/admin/item-list");
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleImageDelete = (id: string | number) =>
    setImages((prevImages) => prevImages.filter((_, i) => i !== id));

  const handleAddImagesClick = () => fileInputRef.current?.click();

  return {
    state: {
      previews,
      fileInputRef,
    },
    actions: {
      handleSubmit,
      handleAddImagesClick,
      handleImageChange,
      handleImageDelete,
    },
  };
};

export default useNewItemAction;
