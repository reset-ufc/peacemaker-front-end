"use client";

import type { PropsWithChildren } from "react";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";

import { ThemeProvider } from "./ThemeProvider";

export function Providers({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <React.Fragment>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        storageKey="theme"
      >
        <NuqsAdapter>
          <TooltipProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </TooltipProvider>
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
