"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";
import React from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <React.Fragment>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        storageKey="theme"
      >
        <NuqsAdapter>
          <TooltipProvider>{children}</TooltipProvider>
        </NuqsAdapter>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          duration={3500}
        />
      </ThemeProvider>
    </React.Fragment>
  );
}
