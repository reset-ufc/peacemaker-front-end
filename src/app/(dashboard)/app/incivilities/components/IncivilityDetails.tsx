import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Comment } from "@/services/comments/action";
import { SuggestionTable } from "./SuggestionTable";

interface IncivilityDetailsProps {
  incivility: Comment | null;
}

export function IncivilityDetails({ incivility }: IncivilityDetailsProps) {
  return (
    <div className="w-2/3">
      {incivility ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage
                  alt={`https://github.com/${incivility.repo_full_name}`}
                  src={`https://github.com/${incivility.repo_full_name}.png`}
                />
                <AvatarFallback>
                  {incivility.repo_full_name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="font-semibold text-2xl">
                  {incivility.repo_full_name}
                </div>
                <Badge className="w-fit">{incivility.classification}</Badge>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex-1 px-4 py-8 text-md">{incivility.comment}</div>
          <Separator className="mt-auto" />
          <div className="p-4">
            <div className="grid gap-4">
              <SuggestionTable />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No incivilities selected
        </div>
      )}
    </div>
  );
}
