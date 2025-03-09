import React, { useState, useEffect } from "react";
import FeedbackButtons from "./FeedbackButtons";
import { AnswerDisplayProps } from "@/types";
import RenderAnswer from "./RenderedAnswer";

interface QAPair {
  questionId: string;
  answer: string;
}

const LOCAL_STORAGE_KEY = "qaHistory";

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

  // Update localStorage when history changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  // Add new QA pair to conversation
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
