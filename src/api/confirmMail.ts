import { ConfirmMail } from "@/types/signupConfirmMail";
import axios from "axios";

export default async function confirmMail(emailData: ConfirmMail) {
  const { email, emailCode } = emailData;
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}users/email-confirm`,
    {
      email: email,
      email_code: emailCode,
    }
  );

  return res.data;
}
