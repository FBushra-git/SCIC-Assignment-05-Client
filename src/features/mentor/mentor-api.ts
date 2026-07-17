import { apiRequest } from "@/lib/api-request";

import type {
  MentorConversation,
  MentorConversationSummary,
} from "./mentor-data";

export async function fetchMentorConversations() {
  return (await apiRequest<MentorConversationSummary[]>("/mentor/conversations")).data;
}

export async function fetchMentorConversation(id: string) {
  return (await apiRequest<MentorConversation>(`/mentor/conversations/${id}`)).data;
}

export async function sendMentorMessage(input: {
  message: string;
  conversationId: string | null;
}) {
  return (
    await apiRequest<MentorConversation>("/mentor/messages", {
      method: "POST",
      body: JSON.stringify({
        message: input.message,
        ...(input.conversationId
          ? { conversationId: input.conversationId }
          : {}),
      }),
    })
  ).data;
}
