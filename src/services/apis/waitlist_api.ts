// const baseUrl = import.meta.env.VITE_API_BASE_URL;
// const projectApiToken = import.meta.env.VITE_PROJECT_API_TOKEN;

export interface WaitlistEntry {
  name: string;
  email: string;
  script?: string;
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
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwG00fp1dSmPGNxuT8abOY8F4vINXmkXdH-QO3cNHyhBlO1RHnys9LcX_TEHnNzLo8PYA/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(entry),
      }
    );

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
