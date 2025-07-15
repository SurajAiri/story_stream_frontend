const baseUrl = import.meta.env.VITE_API_BASE_URL;
const projectApiToken = import.meta.env.VITE_PROJECT_API_TOKEN;

export interface WaitlistEntry {
  name: string;
  email: string;
  extra?: string;
}

export interface WaitlistResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

export const addToWaitlist = async (
  entry: WaitlistEntry
): Promise<WaitlistResponse> => {
  try {
    const response = await fetch(`${baseUrl}/api/waitlist/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${projectApiToken}`,
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to add to waitlist",
    };
  }
};
