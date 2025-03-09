
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// In a production app, you'd want to handle this key securely
// This is just for demonstration purposes
let OPENROUTER_API_KEY = "";

export const setApiKey = (key: string) => {
  OPENROUTER_API_KEY = key;
  localStorage.setItem("openrouter_api_key", key);
};

export const getApiKey = (): string => {
  if (!OPENROUTER_API_KEY) {
    const storedKey = localStorage.getItem("openrouter_api_key");
    if (storedKey) {
      OPENROUTER_API_KEY = storedKey;
    }
  }
  return OPENROUTER_API_KEY;
};

export const hasApiKey = (): boolean => {
  return !!getApiKey();
};

export async function askQuestion(question: string): Promise<string> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("API key is required");
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Computer Science Revision App"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-coder",
        messages: [
          {
            role: "system",
            content: "You are a helpful computer science tutor. Provide concise, accurate responses to questions about computer science concepts. Include examples where helpful. Keep responses under 300 words when possible."
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to get answer");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
