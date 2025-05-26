import axios from "axios";

interface Password {
  old_password: string;
  new_password: string;
}

export default async function editPassword(password: Password) {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}users/password`,
    password,
    {
      withCredentials: true,
    }
  );

  return response;
}
