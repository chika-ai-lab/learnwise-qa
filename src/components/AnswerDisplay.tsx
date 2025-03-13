import React, { useState, useEffect } from "react";
import FeedbackButtons from "./FeedbackButtons";
import { AnswerDisplayProps } from "@/types";
import RenderAnswer from "./RenderedAnswer";

interface QAPair {
  questionId: string;
  answer: string;
}

const LOCAL_STORAGE_KEY = "qaHistory";

/**
 * Composant fonctionnel AnswerDisplay.
 *
 * Ce composant est chargé d'afficher une réponse associée à une question spécifique et de gérer
 * l'historique des conversations à travers le localStorage. Il effectue plusieurs opérations clés :
 *
 * - Charger l'historique sauvegardé depuis le localStorage lors du montage du composant.
 * - Mettre à jour le localStorage chaque fois que l'historique change, afin de conserver un enregistrement
 *   des interactions avec les réponses.
 * - Ajouter un nouveau couple question-réponse à l'historique si cette association n'existe pas déjà pour
 *   éviter les doublons.
 *
 * @param answer La réponse à afficher dans le composant.
 * @param questionId L'identifiant unique de la question associée à la réponse.
 * @param onFeedback Fonction de rappel déclenchée pour le retour d'information (feedback) de l'utilisateur
 *                   (ex. like ou dislike).
 * @param isLiked Indique si l'utilisateur a aimé (like) la réponse.
 * @param isDisliked Indique si l'utilisateur n'a pas aimé (dislike) la réponse.
 *
 * @returns Un élément React qui affiche la réponse avec les boutons de feedback associés.
 */
const AnswerDisplay: React.FC<AnswerDisplayProps> = ({
  answer,
  questionId,
  onFeedback,
  isLiked,
  isDisliked,
}) => {
  const [history, setHistory] = useState<QAPair[]>([]);

  // Load conversation history from localStorage on mount
  useEffect(() => {
    const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error("Failed to parse local storage history", error);
      }
    }
  }, []);

  // Met à jour le localStorage lorsque l'historique change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  // Ajouter une nouvelle paire question-réponse à la conversation
  useEffect(() => {
    if (questionId && answer) {
      setHistory((prev) => {
        const alreadyExists = prev.some(
          (item) => item.questionId === questionId
        );
        if (!alreadyExists) {
          return [...prev, { questionId, answer }];
        }
        return prev;
      });
    }
  }, [questionId, answer]);

  return (
    <div className="flex flex-col space-y-4 space-y-reverse">
      {/* Dernière réponse */}
      <div className="answer-card bg-white p-4 shadow-md rounded-md">
        <div className="mb-4">
          <div className="inline-block px-2 py-1 text-xs font-medium tracking-wide text-primary-foreground bg-primary/90 rounded-md">
            Réponse
          </div>
        </div>
        <div className="prose prose-sm max-w-none mb-4">
          <RenderAnswer answer={answer} />
        </div>
        <FeedbackButtons
          questionId={questionId}
          isLiked={isLiked}
          isDisliked={isDisliked}
          onFeedback={onFeedback}
        />
      </div>
    </div>
  );
};

export default AnswerDisplay;
