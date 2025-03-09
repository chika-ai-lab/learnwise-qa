import React from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";

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
