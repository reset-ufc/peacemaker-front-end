"use client";

import type React from "react";

interface InlineCodeProps {
  children: React.ReactNode;
}

export const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <code
      className="rounded bg-gray-200 px-2 py-1 text-base text-gray-900 dark:bg-gray-700 dark:text-gray-100"
      style={{
        maxWidth: "100%",
        overflowX: "auto",
        wordWrap: "break-word",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {children}
    </code>
  );
};
