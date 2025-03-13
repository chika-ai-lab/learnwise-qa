const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const apiKey = import.meta.env.VITE_OPEN_ROUTER_API_KEY;

if (!apiKey) {
  throw new Error(
    "La clé API est requise et doit être configurée dans les variables d'environnement."
  );
}

export async function askQuestion(
  question: string,
  messageHistory: Array<{ role: string; content: string }>
): Promise<string> {
  if (!question.trim()) {
    return Promise.reject(new Error("La question ne peut pas être vide."));
  }

  // Ajouter la nouvelle question à l'historique
  const updatedHistory = [
    ...messageHistory,
    { role: "user", content: question },
  ];

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Application de révision en informatique",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemma-3-27b-it:free",
        messages: [
          {
            role: "system",
            content: "Vous êtes un expert en informatique et programmation.",
          },
          ...updatedHistory,
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
    }

    const { choices } = await response.json();
    const answer =
      choices?.[0]?.message?.content ?? "Aucune réponse disponible.";

    // Ajouter la réponse à l'historique
    updatedHistory.push({ role: "assistant", content: answer });

    return answer;
  } catch (error) {
    console.error("Erreur API :", error);
    throw new Error(
      "Une erreur s'est produite lors de la communication avec l'API."
    );
  }
}
