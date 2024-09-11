import axios from "axios";
import { ConfirmMail } from "../../types/signupConfirmMail";

export default async function confirmMail(emailData: ConfirmMail) {
  const { email, emailCode } = emailData;
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}users/email-confirm`, { email, email_code: emailCode });
  return response.data;
};