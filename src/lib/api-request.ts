const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

export async function apiRequest<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${apiUrl}/api/v1${path}`, {
    ...init,
    credentials: "include",
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !payload?.success || payload.data === undefined) {
    throw new ApiRequestError(
      payload?.message ?? "The request could not be completed. Please try again.",
      response.status,
    );
  }

  return { data: payload.data, message: payload.message };
}
