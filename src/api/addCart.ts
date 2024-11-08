import axios from "axios";

type AddCartType = {
  article: string;
  quantity: number;
}

export const addCart = async (data: AddCartType) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}cart`, 
    {article_list: [data]}, {
    withCredentials: true,
  });
  return response.data;
};