import axios from 'axios';

export default async function getItem() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}products`, {
    withCredentials: true,
  });
  return response.data;
};