"use client";

import * as React from "react";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { type Mail } from "../data";
import { useMailStore } from "../use-mail";
import { MailDisplay } from "./mail-display";
import { MailList } from "./mail-list";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mail({ mails }: MailProps) {
  const mail = useMailStore();

  return (
    <div className="flex flex-row items-stretch">
      <div className="h-[calc(100vh-4rem)]">
        <Tabs defaultValue="all">
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">Inbox</h1>
            <TabsList className="ml-auto">
              <TabsTrigger
                value="all"
                className="text-zinc-600 dark:text-zinc-200"
              >
                All mail
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Unread
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />

          <TabsContent value="all" className="m-0 py-4">
            <MailList items={mails} />
          </TabsContent>
          <TabsContent value="unread" className="m-0 py-4">
            <MailList items={mails.filter(item => !item.read)} />
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <MailDisplay
          mail={mails.find(item => item.id === mail.selected) || null}
        />
      </div>
    </div>
  );
}
