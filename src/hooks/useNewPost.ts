import newPost from "@/api/newPost";
import { useMutation } from "@tanstack/react-query";

export default function useNewPost() {
  return useMutation({
    mutationFn: (postData: FormData) => newPost(postData),
  });
}
