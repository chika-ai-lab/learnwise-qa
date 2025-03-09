import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import QuestionForm from "@/components/QuestionForm";
import AnswerDisplay from "@/components/AnswerDisplay";
import HistoryPanel from "@/components/HistoryPanel";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useQuestionHistory } from "@/hooks/useQuestionHistory";
import { askQuestion } from "@/services/api";
import { History, X } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    updateFeedback,
  } = useQuestionHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [currentQAId, setCurrentQAId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const mainContentRef = useRef<HTMLDivElement>(null);

  const currentQAPair = currentQAId
    ? history.find((item) => item.id === currentQAId)
    : null;

  // Removed API key effect

  const handleAskQuestion = async (question: string) => {
    setCurrentQuestion(question);
    setCurrentAnswer("");
    setCurrentQAId(null);
    setIsLoading(true);
    setShowHistory(false);

    try {
      const answer = await askQuestion(question);
      setCurrentAnswer(answer);
      const id = addToHistory(question, answer);
      setCurrentQAId(id);
    } catch (error) {
      console.error("Failed to get answer:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'obtenir une réponse. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectQuestion = (id: string) => {
    const item = history.find((h) => h.id === id);
    if (item) {
      setCurrentQuestion(item.question);
      setCurrentAnswer(item.answer);
      setCurrentQAId(id);
      setShowHistory(false);

      // Scroll to top on mobile when selecting a question
      if (mainContentRef.current) {
        mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleDeleteQuestion = (id: string) => {
    removeFromHistory(id);
    if (currentQAId === id) {
      // Clear current Q&A if it's being deleted
      setCurrentQuestion("");
      setCurrentAnswer("");
      setCurrentQAId(null);
    }
  };

  const handleClearHistory = () => {
    clearHistory();
    setCurrentQuestion("");
    setCurrentAnswer("");
    setCurrentQAId(null);
  };

  const handleFeedback = (
    id: string,
    isLiked?: boolean,
    isDisliked?: boolean
  ) => {
    updateFeedback(id, isLiked, isDisliked);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border/50 py-4 px-4 lg:px-6">
        <div className="container max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-medium">LearnWise QA</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-full transition-all ${
                showHistory
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
              aria-label={
                showHistory ? "Fermer l'historique" : "Afficher l'historique"
              }
            >
              {showHistory ? <X size={20} /> : <History size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Question/Answer Area */}
        <main
          ref={mainContentRef}
          className={`flex-1 py-8 px-4 lg:px-6 overflow-y-auto transition-all duration-300 ${
            showHistory ? "md:mr-[350px]" : ""
          }`}
        >
          <div className="container max-w-2xl mx-auto">
            {/* Welcome Message */}
            {!currentQuestion && !currentAnswer && (
              <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-2xl font-medium mb-3">
                  Bienvenue sur LearnWise QA
                </h2>
                <p className="text-muted-foreground mb-6">
                  Posez une question sur n'importe quel concept d'informatique
                  pour obtenir une réponse instantanée.
                </p>
              </div>
            )}

            {/* Question Display */}
            {currentQuestion && (
              <div className="mb-6 animate-slide-down">
                <div className="mb-2">
                  <div className="inline-block px-2 py-1 text-xs font-medium tracking-wide text-foreground/70 bg-secondary rounded-md">
                    Question
                  </div>
                </div>
                <h3 className="text-xl font-medium">{currentQuestion}</h3>
              </div>
            )}

            {/* Loading or Answer */}
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              currentAnswer && (
                <AnswerDisplay
                  answer={currentAnswer}
                  questionId={currentQAId || ""}
                  onFeedback={handleFeedback}
                  isLiked={currentQAPair?.isLiked}
                  isDisliked={currentQAPair?.isDisliked}
                />
              )
            )}

            {/* Question Form */}
            <div className="mt-8 sticky bottom-0 pb-8 pt-4 bg-gradient-to-t from-blue-50 to-transparent">
              <QuestionForm onAsk={handleAskQuestion} isLoading={isLoading} />
            </div>
          </div>
        </main>

        {/* History Sidebar - Hidden on mobile, slides in on desktop */}
        <aside
          className={`fixed inset-y-0 right-0 w-full max-w-[350px] bg-white border-l border-border/50 p-6 transform transition-transform duration-300 ease-apple z-20 ${
            showHistory ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">Historique</h2>
            <button
              onClick={() => setShowHistory(false)}
              className="p-2 rounded-full hover:bg-secondary transition-all"
              aria-label="Fermer l'historique"
            >
              <X size={18} />
            </button>
          </div>
          <HistoryPanel
            history={history}
            onSelectQuestion={handleSelectQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onClearHistory={handleClearHistory}
          />
        </aside>

        {/* Desktop History Sidebar */}
        <aside
          className={`hidden md:block fixed inset-y-0 right-0 w-[350px] bg-white border-l border-border/50 p-6 transform transition-transform duration-300 ease-apple z-20 ${
            showHistory ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <HistoryPanel
            history={history}
            onSelectQuestion={handleSelectQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onClearHistory={handleClearHistory}
          />
        </aside>
      </div>
    </div>
  );
};

export default Index;
