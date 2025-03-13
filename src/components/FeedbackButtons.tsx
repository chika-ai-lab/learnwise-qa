import React from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

/**
 * Composant FeedbackButtons.
 *
 * Ce composant affiche deux boutons permettant de donner un retour d'information sur la réponse fournie.
 * Les utilisateurs peuvent indiquer si la réponse a été utile ou non.
 *
 * @param questionId - Identifiant unique de la question associée au feedback.
 * @param isLiked - Indique si la réponse a déjà été marquée comme "utile". Optionnel.
 * @param isDisliked - Indique si la réponse a déjà été marquée comme "pas utile". Optionnel.
 * @param onFeedback - Fonction de rappel appelée lors d'un clic sur l'un des boutons.
 *                     Cette fonction reçoit l'identifiant de la question, ainsi qu'un booléen pour indiquer si la réponse est marquée comme utile et un autre pour indiquer si elle est marquée comme pas utile.
 *
 * @returns Un élément React contenant les boutons de feedback.
 */
const FeedbackButtons: React.FC<{
  questionId: string;
  isLiked?: boolean;
  isDisliked?: boolean;
  onFeedback: (id: string, isLiked?: boolean, isDisliked?: boolean) => void;
}> = ({ questionId, isLiked, isDisliked, onFeedback }) => (
  <div className="flex items-center justify-end mt-4 space-x-2">
    <span className="text-xs text-muted-foreground mr-2">
      Cette réponse vous a-t-elle aidé?
    </span>
    <button
      className={`p-2 rounded-full transition-all ${
        isLiked
          ? "bg-primary/20 text-primary"
          : "text-muted-foreground hover:bg-secondary"
      }`}
      onClick={() => onFeedback(questionId, !isLiked, false)}
      aria-label="Réponse utile"
    >
      <ThumbsUp size={16} />
    </button>
    <button
      className={`p-2 rounded-full transition-all ${
        isDisliked
          ? "bg-destructive/20 text-destructive"
          : "text-muted-foreground hover:bg-secondary"
      }`}
      onClick={() => onFeedback(questionId, false, !isDisliked)}
      aria-label="Réponse pas utile"
    >
      <ThumbsDown size={16} />
    </button>
  </div>
);

export default FeedbackButtons;
