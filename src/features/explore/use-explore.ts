import { useQuery } from "@tanstack/react-query";

import {
  fetchLearningResources,
  fetchPublicRoadmap,
  fetchPublicRoadmaps,
} from "./explore-api";
import type { ExploreFilters, ResourceFilters } from "./explore-data";

export const publicRoadmapsQueryKey = ["public-roadmaps"] as const;
export const resourcesQueryKey = ["learning-resources"] as const;

export function usePublicRoadmaps(filters: ExploreFilters) {
  return useQuery({
    queryKey: [...publicRoadmapsQueryKey, filters],
    queryFn: () => fetchPublicRoadmaps(filters),
    staleTime: 5 * 60_000,
  });
}

export function usePublicRoadmap(slug: string) {
  return useQuery({
    queryKey: [...publicRoadmapsQueryKey, slug],
    queryFn: () => fetchPublicRoadmap(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60_000,
  });
}

export function useLearningResources(filters: ResourceFilters) {
  return useQuery({
    queryKey: [...resourcesQueryKey, filters],
    queryFn: () => fetchLearningResources(filters),
    staleTime: 5 * 60_000,
  });
}
