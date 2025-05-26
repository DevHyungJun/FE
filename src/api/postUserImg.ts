import axios from "axios";

export default async function postUserImg(file: FormData) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}users/user-image`,
    file,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
