"use client";

import type React from "react";
import { useState } from "react";

import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  language?: string;
  filename?: string;
}

export function CodeBlock({
  children,
  language,
  filename,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    if (typeof children === "string") {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative w-full">
      {filename && (
        <div className="bg-muted flex items-center justify-between rounded-t-lg border border-b-0 px-4 py-2">
          <div className="text-muted-foreground text-sm">{filename}</div>
          {language && (
            <div className="text-muted-foreground text-xs">{language}</div>
          )}
        </div>
      )}
      <pre
        className={cn(
          "mt-0 mb-4 overflow-x-auto rounded-lg border bg-black py-4",
          filename ? "rounded-t-none" : "rounded-t-lg",
          className
        )}
        {...props}
      >
        {children}
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-4 right-4 h-8 w-8"
        onClick={onCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="sr-only">Copy code</span>
      </Button>
    </div>
  );
}
