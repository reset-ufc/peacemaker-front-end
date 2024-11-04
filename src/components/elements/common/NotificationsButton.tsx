"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Notification = {
  id?: string;
  title: string;
  comment?: string;
  solved?: boolean;
  repo_full_name?: string;
  user_login?: string;
};

export function NotificationsButton() {
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex size-10 items-center rounded-md justify-center border border-border"
        >
          <BellIcon className="size-4 text-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel> Inbox </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div
          className={cn(
            "flex min-h-[300px] min-w-[250px] flex-col items-center",
            notifications.length === 0 ? "justify-center" : "",
          )}
        >
          {notifications.map((notification) => (
            <DropdownMenuItem
              className="w-full py-2"
              key={notification.id}
              asChild
            >
              <Link href={`/incivilities/${notification.id}`}>
                <div className="flex max-w-[250px] flex-col gap-px">
                  <div className="flex flex-row items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full bg-transparent p-0.5",
                        !notification.solved && "bg-foreground",
                      )}
                    />
                    <h3
                      className="truncate"
                      title={`${notification.user_login} commented on ${notification.repo_full_name}`}
                    >
                      {notification.user_login} commented on{" "}
                      {notification.repo_full_name}
                    </h3>
                  </div>
                  {notification.comment && (
                    <p
                      className="ms-3 truncate text-muted-foreground"
                      title={notification.comment}
                    >
                      {notification.comment}
                    </p>
                  )}
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
