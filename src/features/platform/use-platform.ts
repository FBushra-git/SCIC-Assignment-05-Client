import { useMutation, useQuery } from "@tanstack/react-query";

import { fetchPlatformStats, subscribeToNewsletter, submitContactRequest } from "./platform-api";

export function usePlatformStats() {
  return useQuery({
    queryKey: ["platform", "stats"],
    queryFn: fetchPlatformStats,
    staleTime: 60_000,
  });
}

export function useNewsletterSubscription() {
  return useMutation({ mutationFn: subscribeToNewsletter });
}

export function useContactRequest() {
  return useMutation({ mutationFn: submitContactRequest });
}
