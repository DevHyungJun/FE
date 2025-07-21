import newPost from "@/api/newPost";
import { useMutation } from "@tanstack/react-query";
import { PostData } from "@/types/newPost";

export default function useNewPost() {
  return useMutation({
    mutationFn: (postData: PostData) => newPost(postData),
  });
}
