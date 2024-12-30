import axios from "axios";

interface AccountData {
  email: string;
  password: string;
}

export default async function deleteAccount(accountData: AccountData) {
  const data = {
    email: accountData.email,
    password: accountData.password,
    userId: accountData.email,
  };

  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}users/delete-account`,
    { data }
  );
  return response;
}
