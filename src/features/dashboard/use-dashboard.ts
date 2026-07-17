import { useQuery } from "@tanstack/react-query";

import { fetchDashboard } from "./dashboard-api";

export const dashboardQueryKey = ["dashboard", "me"] as const;

export function useDashboard(enabled: boolean) {
  return useQuery({
    queryKey: dashboardQueryKey,
    queryFn: fetchDashboard,
    enabled,
    staleTime: 30_000,
  });
}
