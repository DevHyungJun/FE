import axios from "axios";

export default async function editUsername(username: string) {
  const phone = "01012345678";
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}users/info`,
    { username, phone },
    {
      withCredentials: true,
    }
  );
  return response;
}
