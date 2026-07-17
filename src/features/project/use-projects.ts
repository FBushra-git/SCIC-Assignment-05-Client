import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchProject, fetchProjects, saveProjectStatus } from "./project-api";

export const projectsQueryKey = ["projects"] as const;

export function useProjects(
  filters: { search: string; difficulty: string },
  enabled: boolean,
) {
  return useQuery({
    queryKey: [...projectsQueryKey, filters],
    queryFn: () => fetchProjects(filters),
    enabled,
    staleTime: 60_000,
  });
}

export function useProject(slug: string, enabled: boolean) {
  return useQuery({
    queryKey: [...projectsQueryKey, slug],
    queryFn: () => fetchProject(slug),
    enabled: enabled && Boolean(slug),
  });
}

export function useSaveProjectStatus(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveProjectStatus,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [...projectsQueryKey, slug],
      });
      void queryClient.invalidateQueries({ queryKey: projectsQueryKey });
      void queryClient.invalidateQueries({ queryKey: ["dashboard", "me"] });
      void queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
  });
}
