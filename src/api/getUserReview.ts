import axios from "axios";

export default async function getUserReview(
  userId: string,
  orderOption: string
) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}comments?userId=${userId}&ordering=${orderOption}`
  );
  return response.data;
}
