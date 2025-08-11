import { useRouter } from "next/navigation";
import useGetItem from "@/hooks/useGetItem";
import useNewPost from "@/hooks/useNewPost";
import useGetCategory from "@/hooks/useGetCategory";
import useGuestOut from "@/hooks/useGuestOut";
import { useImageUpload } from "./useImageUpload";
import { useCategoryRegister } from "./useCategoryRegister";
import { useProductSelect } from "./useProductSelect";
import { useAlert } from "./useAlert";
import { ERROR_REQUIRED_FIELDS } from "@/constants/postRegisterForm";

interface PostRegisterData {
  data: {
    createdAt: string;
    images: string[];
    price: number;
    product_name: string;
    sales_count: number;
    stock_quantity: number;
    thumbnail: string;
    updatedAt: string;
    user: string;
    __v: number;
    _id: string;
  };
}

export default function usePostRegisterForm() {
  useGuestOut(true);
  const { data, isLoading } = useGetItem();
  const { data: categroy } = useGetCategory();
  const newPost = useNewPost();
  const router = useRouter();
  const {
    images,
    setImages,
    previews,
    setPreviews,
    fileInputRef,
    handleImageChange,
    handleImageDelete,
    handleAddImagesClick,
  } = useImageUpload();
  const {
    categoryShow,
    setCategoryShow,
    categoryName,
    setCategoryName,
    isPending: postCategoryPending,
    handlePostCategory,
  } = useCategoryRegister();
  const {
    selectedProduct,
    setSelectedProduct,
    selectedCategory,
    setSelectedCategory,
    handleSelectChange,
    handleCategoryChange,
  } = useProductSelect();
  const { showError } = useAlert();
  const titleRef = useImageUpload().fileInputRef; // 임시: titleRef는 별도 관리 필요

  const items =
    data?.pages?.flatMap((page: PostRegisterData) => page.data) ?? [];
  const categoryItems = categroy?.data;

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", titleRef.current?.value || "");
    images.forEach((image) => formData.append("detail_images", image));
    formData.append("product", selectedProduct);
    formData.append("category", selectedCategory);
    if (
      !titleRef.current?.value ||
      !selectedProduct ||
      !selectedCategory ||
      images.length === 0
    ) {
      showError(ERROR_REQUIRED_FIELDS);
      return;
    }
    newPost.mutate(formData as FormData, {
      onSuccess: () => {
        router.push("/products");
      },
    });
  };

  return {
    isLoading,
    items,
    categoryItems,
    selectedProduct,
    setSelectedProduct,
    selectedCategory,
    setSelectedCategory,
    images,
    setImages,
    previews,
    setPreviews,
    fileInputRef,
    titleRef,
    categoryShow,
    setCategoryShow,
    categoryName,
    setCategoryName,
    postCategoryPending,
    handleSubmit,
    handleImageChange,
    handleImageDelete,
    handleAddImagesClick,
    handleSelectChange,
    handleCategoryChange,
    handlePostCategory,
  };
}
