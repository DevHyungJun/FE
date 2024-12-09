import axios from "axios";

export default async function deleteCategory(categoryId: string) {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}category/${categoryId}`, {
    withCredentials: true,
  });
  return response.data;
}