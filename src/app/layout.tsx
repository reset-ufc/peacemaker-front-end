import type { Metadata } from "next";
import { Geist as Font } from "next/font/google";
import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";
import { Providers } from "@/providers";
import "@/styles/globals.css";

const font = Font({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "PeaceMakerBot",
    template: "%s | PeaceMakerBot",
  },
  description:
    "GitHub Bot to moderate your GitHub issues, pull requests, and discussions.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={cn("min-h-screen bg-background antialiased", font.className)}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
