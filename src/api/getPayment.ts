import axios from "axios";

export default async function getPayment(page: number) {
  const response = await axios(
    `${process.env.NEXT_PUBLIC_API_URL}payment/payment-history?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      withCredentials: true,
    }
  );

  return response.data;
}
