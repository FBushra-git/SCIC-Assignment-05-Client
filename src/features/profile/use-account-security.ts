import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authClient, getAuthErrorMessage } from "@/features/auth/auth-client";

export type ConnectedAccount = {
  id: string;
  providerId: string;
  accountId: string;
};

export const connectedAccountsQueryKey = ["auth", "connected-accounts"] as const;

function throwAuthError(error: unknown) {
  throw new Error(getAuthErrorMessage(error));
}

export function useConnectedAccounts(enabled = true) {
  return useQuery({
    queryKey: connectedAccountsQueryKey,
    enabled,
    queryFn: async () => {
      const result = await authClient.listAccounts();
      if (result.error) throwAuthError(result.error);
      return (result.data ?? []) as ConnectedAccount[];
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (values: {
      currentPassword: string;
      newPassword: string;
    }) => {
      const result = await authClient.changePassword({
        ...values,
        revokeOtherSessions: true,
      });
      if (result.error) throwAuthError(result.error);
      return result.data;
    },
  });
}

export function useGoogleAccount() {
  const queryClient = useQueryClient();

  const connect = useMutation({
    mutationFn: async () => {
      const result = await authClient.linkSocial({
        provider: "google",
        callbackURL: `${window.location.origin}/profile#security`,
      });
      if (result.error) throwAuthError(result.error);
      return result.data;
    },
  });

  const disconnect = useMutation({
    mutationFn: async () => {
      const result = await authClient.unlinkAccount({ providerId: "google" });
      if (result.error) throwAuthError(result.error);
      return result.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: connectedAccountsQueryKey }),
  });

  return { connect, disconnect };
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (password: string) => {
      const result = await authClient.deleteUser(password ? { password } : {});
      if (result.error) throwAuthError(result.error);
      return result.data;
    },
    onSuccess: () => queryClient.clear(),
  });
}
