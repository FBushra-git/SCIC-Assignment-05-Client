import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchInterviewDashboard,
  fetchInterviewSession,
  generateInterviewSession,
  saveInterviewQuestion,
} from "./interview-api";

export const interviewQueryKey = ["interviews"] as const;

export function useInterviewDashboard(enabled: boolean) {
  return useQuery({
    queryKey: [...interviewQueryKey, "dashboard"],
    queryFn: fetchInterviewDashboard,
    enabled,
  });
}

export function useInterviewSession(
  sessionId: string | null,
  enabled: boolean,
) {
  return useQuery({
    queryKey: [...interviewQueryKey, "session", sessionId],
    queryFn: () => fetchInterviewSession(sessionId ?? ""),
    enabled: enabled && Boolean(sessionId),
  });
}

export function useGenerateInterviewSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateInterviewSession,
    onSuccess: (session) => {
      queryClient.setQueryData(
        [...interviewQueryKey, "session", session.id],
        session,
      );
      void queryClient.invalidateQueries({ queryKey: interviewQueryKey });
      void queryClient.invalidateQueries({ queryKey: ["dashboard", "me"] });
    },
  });
}

export function useSaveInterviewQuestion(sessionId: string | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveInterviewQuestion,
    onSuccess: (session) => {
      queryClient.setQueryData(
        [...interviewQueryKey, "session", session.id],
        session,
      );
      void queryClient.invalidateQueries({
        queryKey: [...interviewQueryKey, "session", sessionId],
      });
      void queryClient.invalidateQueries({
        queryKey: [...interviewQueryKey, "dashboard"],
      });
      void queryClient.invalidateQueries({ queryKey: ["dashboard", "me"] });
    },
  });
}
