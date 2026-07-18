import { apiRequest } from "@/lib/api-request";

import type { ContactReceipt, ContactRequestInput, PlatformStats } from "./platform-data";

export async function fetchPlatformStats() {
  return (await apiRequest<PlatformStats>("/platform/stats")).data;
}

export async function subscribeToNewsletter(email: string) {
  return (
    await apiRequest<null>("/platform/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  ).data;
}

export async function submitContactRequest(input: ContactRequestInput) {
  return (
    await apiRequest<ContactReceipt>("/platform/contact", {
      method: "POST",
      body: JSON.stringify(input),
    })
  ).data;
}
