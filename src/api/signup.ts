import axios from "axios";
import { SignupData } from "../../types/signup";

export default async function signup(signupData: SignupData) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, signupData);
  return response.data;
}