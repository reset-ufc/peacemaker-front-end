import { cookies } from "next/headers";
import Link from "next/link";
import { ComponentProps } from "react";

import { formatDistanceToNow } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

export default async function IncivilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const c = await cookies();
  const t = c.get("access_token")?.value;

  const request = await api.get("/api/comments", {
    headers: {
      Authorization: `Bearer ${t}`,
    },
  });

  const data = request.data.comments;

  // @ts-ignore
  const unsolveds = data.filter(item => !item.solutioned);

  return (
    <main className="flex h-[calc(100vh-4rem)] w-screen flex-row">
      <Tabs className="relative isolate px-2 py-4" defaultValue="all">
        <TabsList className="absolute inset-2 z-10">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unsolveds">Unsolveds</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-full">
          <section className="h-full w-full max-w-md min-w-md border-e pe-2 pt-12">
            <TabsContent value="all">
              <ul className="space-y-4">
                {/* @ts-ignore */}
                {data.map(item => (
                  <li key={item.gh_comment_id} className="text-sm">
                    <Link
                      href={`/incivilities/${item.gh_comment_id}`}
                      className={cn(
                        "hover:bg-accent flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all"
                      )}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {item.repository_fullname}
                            </div>
                            {!item.solutioned && (
                              <Badge
                                variant="secondary"
                                className="border-muted-foreground border"
                              >
                                Unsolved
                              </Badge>
                            )}
                          </div>
                          <div className={cn("ml-auto text-xs")}>
                            {formatDistanceToNow(
                              new Date(item.comment_created_at),
                              {
                                addSuffix: true,
                              }
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-muted-foreground line-clamp-2 text-xs">
                        {item.content.substring(0, 300)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          key={item.classification}
                          variant={getBadgeVariantFromLabel(
                            item.classification
                          )}
                          className="w-fit rounded-lg"
                        >
                          {item.classification}
                        </Badge>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="unsolveds">
              <ul className="space-y-4">
                {/* @ts-ignore */}
                {unsolveds.map(item => (
                  <li key={item.gh_comment_id} className="text-sm">
                    <Link
                      href={`/incivilities/${item.gh_comment_id}`}
                      className={cn(
                        "hover:bg-accent flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all"
                      )}
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">
                              {item.repository_fullname}
                            </div>
                            {!item.solutioned && (
                              <Badge
                                variant="secondary"
                                className="border-muted-foreground border"
                              >
                                Unsolved
                              </Badge>
                            )}
                          </div>
                          <div className={cn("ml-auto text-xs")}>
                            {formatDistanceToNow(
                              new Date(item.comment_created_at),
                              {
                                addSuffix: true,
                              }
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-muted-foreground line-clamp-2 text-xs">
                        {item.content.substring(0, 300)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          key={item.classification}
                          variant={getBadgeVariantFromLabel(
                            item.classification
                          )}
                          className="w-fit rounded-lg"
                        >
                          {item.classification}
                        </Badge>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </section>
        </ScrollArea>
      </Tabs>
      <section className="h-full w-full">{children}</section>
    </main>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  return "outline";
}
