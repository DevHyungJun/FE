import axios from "axios";
import { PostData } from "../../types/newPost";

export default async function newPost(postData: PostData) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}articles`, postData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    }
  );
  return response.data;
};