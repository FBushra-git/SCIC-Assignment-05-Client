import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchMentorConversation,
  fetchMentorConversations,
  sendMentorMessage,
} from "./mentor-api";

export const mentorQueryKey = ["mentor"] as const;

export function useMentorConversations(enabled: boolean) {
  return useQuery({
    queryKey: [...mentorQueryKey, "conversations"],
    queryFn: fetchMentorConversations,
    enabled,
  });
}

export function useMentorConversation(id: string | null | undefined, enabled: boolean) {
  return useQuery({
    queryKey: [...mentorQueryKey, "conversation", id],
    queryFn: () => fetchMentorConversation(id ?? ""),
    enabled: enabled && Boolean(id),
  });
}

export function useSendMentorMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMentorMessage,
    onSuccess: (conversation) => {
      queryClient.setQueryData(
        [...mentorQueryKey, "conversation", conversation.id],
        conversation,
      );
      void queryClient.invalidateQueries({
        queryKey: [...mentorQueryKey, "conversations"],
      });
      void queryClient.invalidateQueries({ queryKey: ["dashboard", "me"] });
    },
  });
}
