import { SignupData } from "@/types/signup";
import axios from "axios";

export default async function signup(signupData: SignupData) {
  const res = await axios.post("/api/signup", signupData);
  return res.data;
}
