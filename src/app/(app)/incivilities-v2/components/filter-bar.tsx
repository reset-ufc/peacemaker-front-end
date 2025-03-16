"use client";

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Crown,
  Flame,
  MessageSquareQuote,
  Shield,
  Skull,
  ThumbsDown,
  UserX,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { CommentCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  selectedCategory: CommentCategory;
  onSelectCategory: (category: CommentCategory) => void;
}

export function FilterBar({
  selectedCategory,
  onSelectCategory,
}: FilterBarProps) {
  const categories = [
    { id: "all", name: "All", icon: null },
    { id: "bitter_frustration", name: "Frustration", icon: Flame },
    { id: "mocking", name: "Mockery", icon: ThumbsDown },
    { id: "irony", name: "Irony", icon: MessageSquareQuote },
    { id: "insulting", name: "Insult", icon: AlertTriangle },
    { id: "vulgarity", name: "Vulgarity", icon: Skull },
    { id: "identity_attack", name: "Identity Attack", icon: UserX },
    { id: "entitlement", name: "Entitlement", icon: Crown },
    { id: "impatience", name: "Impatience", icon: Clock },
    { id: "threat", name: "Threat", icon: Shield },
    { id: "neutral", name: "Neutral", icon: CheckCircle },
    { id: "resolved", name: "Resolved", icon: CheckCircle },
  ];

  return (
    <div className="border-border overflow-x-auto border-b p-2">
      <div className="flex space-x-2 pb-1">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id as CommentCategory)}
              className="flex-shrink-0"
            >
              <Badge
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                className={cn(
                  "hover:bg-accent h-8 cursor-pointer px-3 py-1 transition-colors",
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-background text-muted-foreground hover:text-foreground"
                )}
              >
                {Icon && <Icon className="mr-1 h-3.5 w-3.5" />}
                {category.name}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}
