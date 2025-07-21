import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useGetItem from "@/hooks/useGetItem";
import useNewPost from "@/hooks/useNewPost";
import useGetCategory from "@/hooks/useGetCategory";
import usePostCategory from "@/hooks/usePostCategory";
import { useQueryClient } from "@tanstack/react-query";
import useGuestOut from "@/hooks/useGuestOut";
import {
  MAX_IMAGE_SIZE_MB,
  MAX_IMAGE_SIZE_BYTES,
} from "@/constants/postRegister";

export default function usePostRegisterForm() {
  useGuestOut(true);
  const { data, isLoading } = useGetItem();
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const newPost = useNewPost();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: categroy } = useGetCategory();
  const { mutate: postCategory, isPending: postCategoryPending } =
    usePostCategory();
  const [categoryShow, setCategoryShow] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const items = data?.pages?.flatMap((page: any) => page.data) ?? [];
  const categoryItems = categroy?.data;

  useEffect(() => {
    const objectUrls = images.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);
    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

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
      Swal.fire({
        icon: "error",
        title: "모든 항목을 입력해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    newPost.mutate(formData as any, {
      onSuccess: () => {
        router.push("/products");
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const validFiles: File[] = [];
    const oversizedFiles: string[] = [];
    Array.from(files).forEach((file) => {
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        oversizedFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    });
    if (oversizedFiles.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "파일 크기 제한 초과",
        html: `\n다음 파일은 ${MAX_IMAGE_SIZE_MB}MB를 초과하여 업로드할 수 없습니다:<br/>\n        <strong>${oversizedFiles.join(
          "<br/>"
        )}</strong>\n`,
        showConfirmButton: true,
      });
    }
    if (validFiles.length > 0) {
      setImages((prevImages) => [...prevImages, ...validFiles]);
    }
  };

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleAddImagesClick = () => fileInputRef.current?.click();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedProduct(e.target.value);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedCategory(e.target.value);

  const handlePostCategory = () => {
    if (categoryName === "") {
      Swal.fire({
        icon: "error",
        title: "카테고리 이름을 입력해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    postCategory(
      { category_name: categoryName },
      {
        onSuccess: () => {
          setCategoryShow(false);
          setCategoryName("");
          queryClient.invalidateQueries({ queryKey: ["category"] });
        },
      }
    );
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
