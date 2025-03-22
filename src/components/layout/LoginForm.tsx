"use client";

import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";

import { GitHubIcon } from "@/components/svg/Github";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const fetchUrl = async () => {
      const request: AxiosResponse<{ url: string }> = await api.get(
        "/api/oauth/github",
        {
          params: {
            redirect_uri: "http://localhost:3001/incivilities-v3",
            client_type: "web",
          },
        }
      );

      setUrl(request.data.url);
    };

    fetchUrl();
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Github account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <a
            href={url}
            target="_parent"
            rel="noreferrer"
            className={cn(
              "w-full rounded-xl",
              buttonVariants({
                variant: "default",
              })
            )}
          >
            <GitHubIcon className="size-4" />
            Login with Github
          </a>
        </CardContent>
      </Card>
      <div className="text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a href="/terms" target="_blank" rel="noreferrer">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" target="_blank" rel="noreferrer">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
