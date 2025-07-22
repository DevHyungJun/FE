import { SignupData } from "@/types/signup";
import axios from "axios";

export default async function signup(signupData: SignupData) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}users/signup`,
    signupData
  );
  return res.data;
}
