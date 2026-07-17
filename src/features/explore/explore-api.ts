import { apiRequest } from "@/lib/api-request";

import type {
  ExploreFilters,
  PublicRoadmapDetails,
  PublicRoadmapResult,
  ResourceFilters,
  ResourceResult,
} from "./explore-data";

function queryString(values: Record<string, string | number>) {
  const query = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== "" && value !== 0) query.set(key, String(value));
  });
  return query.toString();
}

export async function fetchPublicRoadmaps(filters: ExploreFilters) {
  const query = queryString({ ...filters, limit: 6 });
  return (await apiRequest<PublicRoadmapResult>(`/public-roadmaps?${query}`)).data;
}

export async function fetchPublicRoadmap(slug: string) {
  return (await apiRequest<PublicRoadmapDetails>(`/public-roadmaps/${slug}`)).data;
}

export async function fetchLearningResources(filters: ResourceFilters) {
  const query = queryString({ ...filters, limit: 8 });
  return (await apiRequest<ResourceResult>(`/resources?${query}`)).data;
}
