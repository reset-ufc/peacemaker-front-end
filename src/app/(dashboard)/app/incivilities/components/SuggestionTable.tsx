"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SuggestionActions } from "./SuggestionActions";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { getSuggestion } from "@/services/comments/action";

export function SuggestionTable() {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Array<string>>([]);

  const handleSuggestions = async () => {
    const suggestions = await getSuggestion();
    setSuggestions(suggestions.map((suggestion) => suggestion.content));
  };

  return (
    <div
      className={cn(
        "mt-4 flex flex-col gap-4",
        suggestions.length === 0 && "flex flex-row justify-between"
      )}
    >
      <h2 className="text-lg font-bold">Suggestions for fixing your comment</h2>
      {suggestions.length > 0 ? (
        <div className=" flex flex-col gap-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Select</TableHead>
                  <TableHead>Suggestion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suggestions.map((suggestion, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <TableRow key={index}>
                    <TableCell>
                      <form>
                        <input
                          type="radio"
                          value={suggestion}
                          checked={selectedSuggestion === suggestion}
                          onChange={() => setSelectedSuggestion(suggestion)}
                        />
                      </form>
                    </TableCell>
                    <TableCell className="flex flex-row justify-between">
                      {suggestion}

                      {selectedSuggestion === suggestion && (
                        <SuggestionActions
                          selectedSuggestion={selectedSuggestion}
                          suggestion={suggestion}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center">
            <Button type="submit" size="sm" className="ml-auto">
              Send
            </Button>
          </div>
        </div>
      ) : (
        <Button onClick={handleSuggestions}>Loading suggestions</Button>
      )}
    </div>
  );
}
