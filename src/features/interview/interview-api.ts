import { apiRequest } from "@/lib/api-request";

import type {
  GenerateInterviewInput,
  InterviewDashboard,
  InterviewSession,
} from "./interview-data";

export async function fetchInterviewDashboard() {
  return (await apiRequest<InterviewDashboard>("/interviews/dashboard")).data;
}

export async function fetchInterviewSession(id: string) {
  return (await apiRequest<InterviewSession>(`/interviews/sessions/${id}`)).data;
}

export async function generateInterviewSession(input: GenerateInterviewInput) {
  return (
    await apiRequest<InterviewSession>("/interviews/sessions", {
      method: "POST",
      body: JSON.stringify(input),
    })
  ).data;
}

export async function saveInterviewQuestion(input: {
  sessionId: string;
  questionId: string;
  bookmarked?: boolean;
  completed?: boolean;
}) {
  return (
    await apiRequest<InterviewSession>(
      `/interviews/sessions/${input.sessionId}/questions/${input.questionId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          ...(input.bookmarked !== undefined
            ? { bookmarked: input.bookmarked }
            : {}),
          ...(input.completed !== undefined
            ? { completed: input.completed }
            : {}),
        }),
      },
    )
  ).data;
}
