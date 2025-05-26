import axios from "axios";

export default async function getUserImg() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}users/user-image`,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
