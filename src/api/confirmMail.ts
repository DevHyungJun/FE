import { ConfirmMail } from "@/types/signupConfirmMail";
import axios from "axios";

export default async function confirmMail(emailData: ConfirmMail) {
  const { email, emailCode } = emailData;
  const res = await axios.post("/api/confirm-mail", {
    email: email,
    authNum: emailCode,
  });

  return res.data;
}
