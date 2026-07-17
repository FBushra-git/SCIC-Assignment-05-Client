import { apiRequest } from "@/lib/api-request";

import type { Project, ProjectDetails, ProjectStatus } from "./project-data";

export async function fetchProjects(filters: {
  search: string;
  difficulty: string;
}) {
  const query = new URLSearchParams();
  if (filters.search) query.set("search", filters.search);
  if (filters.difficulty) query.set("difficulty", filters.difficulty);
  const suffix = query.size ? `?${query.toString()}` : "";
  return (await apiRequest<Project[]>(`/projects${suffix}`)).data;
}

export async function fetchProject(slug: string) {
  return (await apiRequest<ProjectDetails>(`/projects/${slug}`)).data;
}

export async function saveProjectStatus(input: {
  slug: string;
  status: ProjectStatus;
}) {
  return (
    await apiRequest<Project>(`/projects/${input.slug}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: input.status }),
    })
  ).data;
}
