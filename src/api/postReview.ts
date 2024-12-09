import axios from "axios";

interface ReviewData {
  title: string;
  content: string;
  images: File[];
  rate: number;
};

export default async function postReview(id:string, data: ReviewData) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}comments/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};