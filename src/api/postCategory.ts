import axios from "axios";

type Category = {
  category_name: string;
};

export default async function postCategory(data: Category) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}category`, data, {
    withCredentials: true,
  });
  return response.data;
}