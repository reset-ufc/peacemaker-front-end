"use client";

import { useTheme } from "next-themes";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";
import styles from "@/styles/markdown-styles.module.css";

interface MarkdownDisplayProps {
  text: string;
  className?: string;
}

export function MarkdownDisplay({ text, className }: MarkdownDisplayProps) {
  const theme = useTheme();

  const style = theme.resolvedTheme === "dark" ? oneDark : oneLight;

  return (
    <Markdown
      // eslint-disable-next-line react/no-children-prop
      children={text}
      className={cn(className, styles.reactMarkDown)}
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className, node, ref, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              // eslint-disable-next-line react/no-children-prop
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={style}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}
