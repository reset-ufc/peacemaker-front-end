"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Search } from "lucide-react";

import { useSearch } from "./search-provider";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { search, searchResults, isSearching } = useSearch();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (slug: string) => {
    setOpen(false);
    router.push(`/docs/${slug}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="text-muted-foreground relative h-8 w-full justify-start text-sm sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="bg-muted pointer-events-none absolute top-1.5 right-1.5 hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search documentation..."
          onValueChange={search}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
            {isSearching ? (
              <CommandItem disabled>Searching...</CommandItem>
            ) : (
              searchResults.map(result => (
                <CommandItem
                  key={result.slug}
                  onSelect={() => handleSelect(result.slug)}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{result.title}</span>
                    <span className="text-muted-foreground text-sm">
                      {result.description}
                    </span>
                  </div>
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
