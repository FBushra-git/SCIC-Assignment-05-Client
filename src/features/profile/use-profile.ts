import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchProfile, saveProfile } from "./profile-api";

export const profileQueryKey = ["profile", "me"] as const;

export function useProfile(enabled: boolean) {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: fetchProfile,
    enabled,
  });
}

export function useSaveProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveProfile,
    onSuccess: (response) => {
      queryClient.setQueryData(profileQueryKey, response.data);
      void queryClient.invalidateQueries({ queryKey: ["dashboard", "me"] });
    },
  });
}
