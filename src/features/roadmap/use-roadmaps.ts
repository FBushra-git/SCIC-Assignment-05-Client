import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createRoadmap,
  fetchRoadmap,
  fetchRoadmaps,
  setRoadmapStep,
} from "./roadmap-api";

export const roadmapsQueryKey = ["roadmaps"] as const;

export function useRoadmaps(enabled: boolean) {
  return useQuery({
    queryKey: roadmapsQueryKey,
    queryFn: fetchRoadmaps,
    enabled,
  });
}

export function useRoadmap(id: string, enabled: boolean) {
  return useQuery({
    queryKey: [...roadmapsQueryKey, id],
    queryFn: () => fetchRoadmap(id),
    enabled: enabled && Boolean(id),
  });
}

export function useGenerateRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoadmap,
    onSuccess: (roadmap) => {
      queryClient.setQueryData([...roadmapsQueryKey, roadmap.id], roadmap);
      void queryClient.invalidateQueries({ queryKey: roadmapsQueryKey });
      void queryClient.invalidateQueries({ queryKey: ["dashboard", "me"] });
    },
  });
}

export function useUpdateRoadmapStep(roadmapId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setRoadmapStep,
    onSuccess: (roadmap) => {
      queryClient.setQueryData([...roadmapsQueryKey, roadmapId], roadmap);
      void queryClient.invalidateQueries({ queryKey: roadmapsQueryKey });
      void queryClient.invalidateQueries({ queryKey: ["dashboard", "me"] });
    },
  });
}
