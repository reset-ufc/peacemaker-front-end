import { formatDistanceToNow } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Comment } from "@/services/comments/action";

import { MarkdownDisplay } from "./MarkdownDisplay";
import { Suggestions } from "./Suggestions";

interface IncivilityDetailsProps {
  incivility: Comment | null;
}

export function IncivilityDetails({ incivility }: IncivilityDetailsProps) {
  return (
    <div className="w-3/4">
      {incivility ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex flex-col items-start gap-y-4">
              <div className="flex flex-row items-center gap-x-4">
                <Avatar>
                  <AvatarImage
                    alt={`https://github.com/${incivility.login}.png`}
                    src={`https://github.com/${incivility.login}.png`}
                  />
                  <AvatarFallback>
                    {incivility.repo_full_name
                      .split(" ")
                      .map(chunk => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="text-xl font-semibold">
                    {incivility.repo_full_name}
                  </div>
                  <Badge>{incivility.classification}</Badge>
                </div>
              </div>
              <p
                className="text-sm"
                title={new Date(incivility.created_at).toTimeString()}
              >
                {" "}
                {formatDistanceToNow(new Date(incivility.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          <Separator />

          <MarkdownDisplay
            text={incivility.content}
            className="flex-1 px-4 py-8"
          />
          <Separator className="mt-auto" />

          <div className="p-4">
            <div className="grid gap-4">
              <Suggestions suggestions={incivility.suggestions} />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          Select an incivility to see more details
        </div>
      )}
    </div>
  );
}
