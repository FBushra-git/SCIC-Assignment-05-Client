import { apiRequest } from "@/lib/api-request";

import type { Item, ItemDetails, ItemFilters, ItemInput, ItemResult } from "./item-data";

function queryString(filters: ItemFilters) {
  const query = new URLSearchParams();
  if (filters.search) query.set("search", filters.search);
  if (filters.priority) query.set("priority", filters.priority);
  if (filters.technology) query.set("technology", filters.technology);
  query.set("sort", filters.sort);
  query.set("page", String(filters.page));
  query.set("limit", "8");
  return query.toString();
}

export async function fetchPublicItems(filters: ItemFilters) {
  return (await apiRequest<ItemResult>(`/items/public?${queryString(filters)}`)).data;
}

export async function fetchOwnedItems(filters: ItemFilters) {
  return (await apiRequest<ItemResult>(`/items/mine?${queryString(filters)}`)).data;
}

export async function fetchPublicItem(itemId: string) {
  return (await apiRequest<ItemDetails>(`/items/public/${itemId}`)).data;
}

export async function fetchOwnedItem(itemId: string) {
  return (await apiRequest<Item>(`/items/mine/${itemId}`)).data;
}

export async function createItem(input: ItemInput) {
  return (
    await apiRequest<Item>("/items", {
      method: "POST",
      body: JSON.stringify(input),
    })
  ).data;
}

export async function updateItem(input: ItemInput & { id: string }) {
  const { id, ...body } = input;
  return (
    await apiRequest<Item>(`/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    })
  ).data;
}

export async function deleteItem(itemId: string) {
  return (
    await apiRequest<null>(`/items/${itemId}`, {
      method: "DELETE",
    })
  ).data;
}
