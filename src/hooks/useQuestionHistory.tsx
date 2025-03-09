
import { useState, useEffect } from "react";
import { QAPair } from "../types";

export function useQuestionHistory() {
  const [history, setHistory] = useState<QAPair[]>([]);
  
  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("question_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history:", e);
        // Reset history if parsing fails
        localStorage.removeItem("question_history");
      }
    }
  }, []);
  
  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("question_history", JSON.stringify(history));
  }, [history]);
  
  const addToHistory = (question: string, answer: string) => {
    const newEntry: QAPair = {
      id: Date.now().toString(),
      question,
      answer,
      timestamp: Date.now()
    };
    
    setHistory(prev => [newEntry, ...prev]);
    return newEntry.id;
  };
  
  const removeFromHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };
  
  const clearHistory = () => {
    setHistory([]);
  };
  
  const updateFeedback = (id: string, isLiked?: boolean, isDisliked?: boolean) => {
    setHistory(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, isLiked, isDisliked } 
          : item
      )
    );
  };
  
  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    updateFeedback
  };
}
