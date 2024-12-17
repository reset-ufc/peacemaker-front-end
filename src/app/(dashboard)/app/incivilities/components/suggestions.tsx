"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface SuggestionsProps {
  suggestions: Array<string>;
  onSelect: (suggestion: string) => void;
}

export function SuggestionCorrectingIncivilities({
  suggestions,
  onSelect,
}: SuggestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number, suggestion: string) => {
    setSelectedIndex(index);
    onSelect(suggestion);
  };

  return (
    <div className="mt-4">
      <h2 className="mb-2 text-lg font-bold">
        Suggestions for fixing your comment
      </h2>
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
                  <input
                    type="checkbox"
                    checked={selectedIndex === index}
                    onChange={() => handleSelect(index, suggestion)}
                  />
                </TableCell>
                <TableCell>{suggestion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
