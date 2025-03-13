import { useState, useEffect } from "react";
import { QAPair } from "../types";

/**
 * Hook personnalisé pour gérer l'historique des questions et réponses.
 *
 * @returns Un objet contenant les données de l'historique et les fonctions pour le manipuler.
 */
export function useQuestionHistory() {
  const [history, setHistory] = useState<QAPair[]>([]);

  /**
   * Charge l'historique depuis localStorage au montage du composant.
   */
  useEffect(() => {
    const savedHistory = localStorage.getItem("question_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Échec de l'analyse de l'historique :", e);
        // Réinitialise l'historique en cas d'échec d'analyse
        localStorage.removeItem("question_history");
      }
    }
  }, []);

  /**
   * Enregistre l'historique dans localStorage dès qu'il change.
   */
  useEffect(() => {
    localStorage.setItem("question_history", JSON.stringify(history));
  }, [history]);

  /**
   * Ajoute une nouvelle paire question-réponse à l'historique.
   *
   * @param question - La chaîne représentant la question.
   * @param answer - La chaîne représentant la réponse.
   * @returns L'ID unique de la nouvelle entrée dans l'historique.
   */
  const addToHistory = (question: string, answer: string) => {
    const newEntry: QAPair = {
      id: Date.now().toString(),
      question,
      answer,
      timestamp: Date.now(),
    };

    setHistory((prev) => [newEntry, ...prev]);
    return newEntry.id;
  };

  /**
   * Supprime une entrée de l'historique par son ID.
   *
   * @param id - L'ID de l'entrée à supprimer.
   */
  const removeFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  /**
   * Efface toutes les entrées de l'historique.
   */
  const clearHistory = () => {
    setHistory([]);
  };

  /**
   * Met à jour le retour (feedback) d'une entrée de l'historique par son ID.
   *
   * @param id - L'ID de l'entrée à mettre à jour.
   * @param isLiked - Optionnel, indique un feedback positif.
   * @param isDisliked - Optionnel, indique un feedback négatif.
   */
  const updateFeedback = (
    id: string,
    isLiked?: boolean,
    isDisliked?: boolean
  ) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isLiked, isDisliked } : item
      )
    );
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    updateFeedback,
  };
}
