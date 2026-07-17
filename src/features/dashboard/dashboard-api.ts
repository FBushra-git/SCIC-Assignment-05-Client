import type { DashboardData } from "./dashboard-data";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

type DashboardEnvelope = {
  success: boolean;
  message?: string;
  data?: DashboardData;
};

export async function fetchDashboard() {
  const response = await fetch(`${apiUrl}/api/v1/dashboard`, {
    credentials: "include",
  });
  const payload = (await response.json().catch(() => null)) as DashboardEnvelope | null;

  if (!response.ok || !payload?.success || !payload.data) {
    throw new Error(payload?.message ?? "Your dashboard could not be loaded.");
  }

  return payload.data;
}
