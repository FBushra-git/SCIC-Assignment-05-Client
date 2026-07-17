import type { ProfileFormValues } from "./profile-schema";
import type { UserProfile } from "./profile-data";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

type ApiEnvelope = {
  success: boolean;
  message?: string;
  data: UserProfile;
  meta?: { recommendationRefreshQueued: boolean };
};

export class ProfileApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ProfileApiError";
  }
}

async function profileRequest(path: string, init?: RequestInit) {
  const response = await fetch(`${apiUrl}/api/v1${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const payload = (await response.json().catch(() => null)) as ApiEnvelope | null;

  if (!response.ok || !payload?.success) {
    throw new ProfileApiError(
      payload?.message ?? "Your profile could not be loaded. Please try again.",
      response.status,
    );
  }

  return payload;
}

export async function fetchProfile() {
  const response = await profileRequest("/profiles/me");
  return response.data;
}

export async function saveProfile(values: ProfileFormValues) {
  return profileRequest("/profiles/me", {
    method: "PUT",
    body: JSON.stringify(values),
  });
}
