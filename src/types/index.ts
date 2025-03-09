export interface Question {
  id: string;
  text: string;
  timestamp: number;
}

export interface Answer {
  text: string;
  questionId: string;
  timestamp: number;
}

export interface QAPair {
  id: string;
  question: string;
  answer: string;
  timestamp: number;
  isLiked?: boolean;
  isDisliked?: boolean;
}

export interface APIResponse {
  id: string;
  choices: {
    message: {
      content: string;
    };
  }[];
  created: number;
}

export interface AnswerDisplayProps {
  answer: string;
  questionId: string;
  onFeedback: (id: string, isLiked?: boolean, isDisliked?: boolean) => void;
  isLiked?: boolean;
  isDisliked?: boolean;
}
