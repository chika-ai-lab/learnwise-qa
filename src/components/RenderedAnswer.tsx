import React from "react";
import Prism from "prismjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/themes/prism.css";

const renderMath = (text: string) => {
  // Retourne toujours le texte brut sans essayer de le rendre avec KaTeX
  return text;
};

const RenderAnswer = ({ answer }: { answer: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({
          inline,
          className,
          children,
          ...props
        }: {
          inline?: boolean;
          className?: string;
          children?: React.ReactNode;
        }) {
          const match = /language-(\w+)/.exec(className || "");
          if (inline) {
            return <code className="bg-gray-200 px-1 rounded">{children}</code>;
          }
          return (
            <pre
              className={className}
              style={{ maxHeight: "400px", overflow: "auto" }}
            >
              <code
                dangerouslySetInnerHTML={{
                  __html: Prism.highlight(
                    String(children).trim(),
                    match
                      ? Prism.languages[match[1]] || Prism.languages.markup
                      : Prism.languages.markup,
                    match ? match[1] : "markup"
                  ),
                }}
              />
            </pre>
          );
        },
        span({ children }) {
          const text = String(children);
          // Ne traite pas les expressions LaTeX
          return <span>{text}</span>;
        },
      }}
    >
      {answer}
    </ReactMarkdown>
  );
};

export default RenderAnswer;
