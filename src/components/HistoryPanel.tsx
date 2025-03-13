import React from "react";
import { QAPair } from "../types";
import { Clock, Trash2 } from "lucide-react";

interface HistoryPanelProps {
  history: QAPair[];
  onSelectQuestion: (id: string) => void;
  onDeleteQuestion: (id: string) => void;
  onClearHistory: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onSelectQuestion,
  onDeleteQuestion,
  onClearHistory,
}) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  if (history.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-muted-foreground">Aucun historique disponible</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium flex items-center">
          <Clock size={18} className="mr-2" />
          Historique
        </h2>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            Effacer tout
          </button>
        )}
      </div>

      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="history-item group">
            <div
              className="flex justify-between items-start"
              onClick={() => onSelectQuestion(item.id)}
            >
              <div className="flex-1">
                <p className="font-medium line-clamp-1">{item.question}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(item.timestamp)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteQuestion(item.id);
                }}
                className="p-1.5 rounded-full text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-secondary hover:text-destructive transition-all"
                aria-label="Supprimer cette question"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
