import axios from "axios";

export default async function editUserImg(file: FormData) {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}users/user-image`,
    file,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
