import { apiRequest } from "@/lib/api-request";

import type { Recommendation } from "./recommendation-data";

export async function refreshRecommendations() {
  return (
    await apiRequest<Recommendation>("/recommendations/refresh", {
      method: "POST",
    })
  ).data;
}
