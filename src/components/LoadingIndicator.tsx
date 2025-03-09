
import React from "react";

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = "Loading answer" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <div className="flex space-x-2">
        <div className="loading-dot" style={{ animationDelay: "0ms" }}></div>
        <div className="loading-dot" style={{ animationDelay: "300ms" }}></div>
        <div className="loading-dot" style={{ animationDelay: "600ms" }}></div>
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default LoadingIndicator;
