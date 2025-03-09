
import React, { useState } from "react";
import { SendHorizonal } from "lucide-react";

interface QuestionFormProps {
  onAsk: (question: string) => void;
  isLoading: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onAsk, isLoading }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onAsk(question.trim());
      // Don't clear the input immediately - it provides better UX to see what was asked
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Posez une question sur l'informatique..."
          className="question-input pr-16"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg bg-primary text-white transition-all disabled:opacity-50 disabled:pointer-events-none hover:bg-primary/90"
          disabled={!question.trim() || isLoading}
          aria-label="Envoyer la question"
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
