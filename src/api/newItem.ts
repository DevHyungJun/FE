import axios from "axios";

type FormData = {
  product_name: string;
  price: string;
  stock_quantity: string;
  images: File;
  thumbnail: File;
}

export default async function newItem(formData: FormData) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}products`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
  return response.data;
}