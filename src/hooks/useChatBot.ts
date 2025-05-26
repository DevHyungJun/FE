import chatBot from "@/api/chatBot";
import { useMutation } from "@tanstack/react-query";

export default function useChatBot() {
  return useMutation({
    mutationFn: (user_message: string) => chatBot(user_message),
  });
}
