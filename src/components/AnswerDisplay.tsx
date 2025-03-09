
import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface AnswerDisplayProps {
  answer: string;
  questionId: string;
  onFeedback: (id: string, isLiked?: boolean, isDisliked?: boolean) => void;
  isLiked?: boolean;
  isDisliked?: boolean;
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({
  answer,
  questionId,
  onFeedback,
  isLiked,
  isDisliked
}) => {
  return (
    <div className="answer-card">
      <div className="mb-4">
        <div className="inline-block px-2 py-1 text-xs font-medium tracking-wide text-primary-foreground bg-primary/90 rounded-md">
          Réponse
        </div>
      </div>
      
      <div className="prose prose-sm max-w-none mb-4">
        {answer.split('\n').map((paragraph, i) => (
          paragraph ? <p key={i}>{paragraph}</p> : <br key={i} />
        ))}
      </div>
      
      <div className="flex items-center justify-end mt-4 space-x-2">
        <span className="text-xs text-muted-foreground mr-2">Cette réponse vous a-t-elle aidé?</span>
        <button 
          className={`p-2 rounded-full transition-all ${isLiked ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-secondary'}`}
          onClick={() => onFeedback(questionId, !isLiked, false)}
          aria-label="Réponse utile"
        >
          <ThumbsUp size={16} />
        </button>
        <button 
          className={`p-2 rounded-full transition-all ${isDisliked ? 'bg-destructive/20 text-destructive' : 'text-muted-foreground hover:bg-secondary'}`}
          onClick={() => onFeedback(questionId, false, !isDisliked)}
          aria-label="Réponse pas utile"
        >
          <ThumbsDown size={16} />
        </button>
      </div>
    </div>
  );
};

export default AnswerDisplay;
