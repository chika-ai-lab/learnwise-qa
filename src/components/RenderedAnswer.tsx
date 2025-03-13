import React from "react";
import Prism from "prismjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/themes/prism.css";

/**
 * Composant RenderAnswer qui affiche une réponse en format Markdown.
 *
 * Ce composant utilise ReactMarkdown avec le plugin remarkGfm pour interpréter le Markdown
 * en autorisant la syntaxe GFM (GitHub Flavored Markdown).
 *
 * Le composant définit des rendus personnalisés pour :
 * - Les blocs de code (<code>):
 *   - Pour le code en ligne, il applique un style avec un fond gris clair et arrondi.
 *   - Pour les blocs de code, il utilise Prism pour la coloration syntaxique.
 *     La hauteur maximale est limitée à 400px avec un défilement automatique en cas de dépassement.
 *
 * - Les éléments <span>:
 *   - Affiche le texte tel quel sans modification, permettant ainsi d'éviter le traitement des expressions LaTeX.
 *
 * @param answer - Chaîne de caractères contenant la réponse au format Markdown.
 *
 * @returns L'élément React construit à partir du contenu markdown.
 */
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
