import { useMutation, useQueryClient } from "@tanstack/react-query";

import { refreshRecommendations } from "./recommendation-api";

export function useRefreshRecommendations() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: refreshRecommendations,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["dashboard", "me"] });
      void queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
  });
}
