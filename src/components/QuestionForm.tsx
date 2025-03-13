import React, { useState } from "react";
import { SendHorizonal } from "lucide-react";

interface QuestionFormProps {
  onAsk: (question: string) => void;
  isLoading: boolean;
}

/**
 * Composant de formulaire pour poser une question.
 *
 * Ce composant affiche un textarea permettant à l'utilisateur de saisir une question relative à l'informatique.
 * La soumission se fait soit en cliquant sur le bouton dédié, soit en appuyant sur la touche "Entrée" (sans utiliser "Shift"),
 * à condition que le champ de texte ne soit pas vide et que l'état de chargement ne soit pas actif.
 *
 * Lors de la soumission d'une question valide, la fonction callback onAsk est appelée avec la question trimée, et le contenu du champ est réinitialisé.
 *
 * @param props - Propriétés du composant.
 * @param props.onAsk - Fonction callback invoquée lors de la soumission d'une question.
 * @param props.isLoading - Indique si une opération de chargement est en cours, désactivant le formulaire si c'est le cas.
 */
const QuestionForm: React.FC<QuestionFormProps> = ({ onAsk, isLoading }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onAsk(question.trim());

      setQuestion("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (question.trim() && !isLoading) {
        onAsk(question.trim());
        setQuestion("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Posez une question sur l'informatique..."
          className="question-input pr-16 max-h-24"
          disabled={isLoading}
          rows={3}
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
