import axios from "axios";

export default async function deleteUserImg() {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}users/user-image`,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
