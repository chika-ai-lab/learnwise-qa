import React from "react";
import katex from "katex";
import Prism from "prismjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/themes/prism.css";
import "katex/dist/katex.min.css";

const renderMath = (text: string) => {
  try {
    return katex.renderToString(text, { throwOnError: false });
  } catch (e) {
    return text;
  }
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
          if (text.includes("\\boxed{")) {
            return (
              <span dangerouslySetInnerHTML={{ __html: renderMath(text) }} />
            );
          }
          return <span>{text}</span>;
        },
      }}
    >
      {answer}
    </ReactMarkdown>
  );
};

export default RenderAnswer;
