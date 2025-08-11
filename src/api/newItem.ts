import axios from "axios";

export default async function newItem(formData: FormData) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}products`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
  return response.data;
}
