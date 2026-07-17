import { apiRequest } from "@/lib/api-request";

import type { GenerateRoadmapInput, Roadmap } from "./roadmap-data";

export async function fetchRoadmaps() {
  return (await apiRequest<Roadmap[]>("/roadmaps")).data;
}

export async function fetchRoadmap(id: string) {
  return (await apiRequest<Roadmap>(`/roadmaps/${id}`)).data;
}

export async function createRoadmap(input: GenerateRoadmapInput) {
  return (
    await apiRequest<Roadmap>("/roadmaps/generate", {
      method: "POST",
      body: JSON.stringify(input),
    })
  ).data;
}

export async function setRoadmapStep(input: {
  roadmapId: string;
  stepId: string;
  completed: boolean;
  studyMinutes?: number;
}) {
  return (
    await apiRequest<Roadmap>(
      `/roadmaps/${input.roadmapId}/steps/${input.stepId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          completed: input.completed,
          studyMinutes: input.studyMinutes,
        }),
      },
    )
  ).data;
}
