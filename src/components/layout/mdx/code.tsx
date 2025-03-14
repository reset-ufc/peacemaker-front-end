"use client";

import type React from "react";
import { useRef, useState } from "react";

interface CodeProps {
  className?: string;
  children: React.ReactNode;
}

export const Code = (props: CodeProps) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const className = props.className || "";
  const matches = className.match(/language-(.*)/);
  const language = matches?.[1] || "";

  const handleCopy = () => {
    if (codeRef.current) {
      const codeText = codeRef.current.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div
      className="w-full max-w-full gap-0 overflow-hidden rounded-lg pb-6 text-white"
      style={{ maxWidth: "100%", overflow: "hidden" }}
    >
      <div className="flex items-center justify-between rounded-t-lg bg-gray-900 px-4 py-2">
        <span className="text-gray-300">{language}</span>
        <button
          type="button"
          className="text-gray-300 hover:text-white"
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        className="block w-full max-w-full overflow-auto rounded-b-lg bg-gray-800 p-4"
        style={{
          maxWidth: "100%",
          overflowX: "auto",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        <code
          ref={codeRef}
          className={`${className} block w-full bg-gray-800`}
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {props.children}
        </code>
      </pre>
    </div>
  );
};
