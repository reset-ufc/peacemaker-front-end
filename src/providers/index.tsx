"use client";

import type { PropsWithChildren } from "react";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Toaster } from "sonner";

import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "./ThemeProvider";

export function Providers({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            storageKey='theme'
          >
            <NuqsAdapter>{children}</NuqsAdapter>
            <Toaster
              position='bottom-right'
              richColors
              closeButton
              duration={3500}
            />
          </ThemeProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.Fragment>
  );
}
