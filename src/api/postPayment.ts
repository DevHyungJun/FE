import axios from "axios";

interface OrderData {
  product: string;
  quantity: number;
}

export default async function postPayment(orderData: OrderData[]) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}payment`,
    {
      product_list: orderData,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
}
