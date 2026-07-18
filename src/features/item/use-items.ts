import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createItem,
  deleteItem,
  fetchOwnedItem,
  fetchOwnedItems,
  fetchPublicItem,
  fetchPublicItems,
  updateItem,
} from "./item-api";
import type { ItemFilters } from "./item-data";

export const itemsQueryKey = ["items"] as const;

export function usePublicItems(filters: ItemFilters) {
  return useQuery({
    queryKey: [...itemsQueryKey, "public", filters],
    queryFn: () => fetchPublicItems(filters),
  });
}

export function useOwnedItems(filters: ItemFilters, enabled: boolean) {
  return useQuery({
    queryKey: [...itemsQueryKey, "mine", filters],
    queryFn: () => fetchOwnedItems(filters),
    enabled,
  });
}

export function usePublicItem(itemId: string) {
  return useQuery({
    queryKey: [...itemsQueryKey, "public", itemId],
    queryFn: () => fetchPublicItem(itemId),
    enabled: Boolean(itemId),
  });
}

export function useOwnedItem(itemId: string | null, enabled: boolean) {
  return useQuery({
    queryKey: [...itemsQueryKey, "mine", itemId],
    queryFn: () => fetchOwnedItem(itemId ?? ""),
    enabled: enabled && Boolean(itemId),
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: itemsQueryKey });
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateItem,
    onSuccess: (item) => {
      queryClient.setQueryData([...itemsQueryKey, "mine", item.id], item);
      void queryClient.invalidateQueries({ queryKey: itemsQueryKey });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: itemsQueryKey });
    },
  });
}
