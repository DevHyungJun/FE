import axios from "axios";

type OrderData = {
  articleId: string;
  product: string;
  quantity: number;
}[];

export default async function order(data: OrderData) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}order`,
    {
      product_list: data,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
}
