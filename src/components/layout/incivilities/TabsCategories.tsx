import { useState } from "react";

import { ChevronDown, ChevronUp, Filter, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabsCategoriesProps {
  activeFilter: string;
  handleFilterChange: (value: string) => void;
  filterCounts?: Record<string, number>;
  className?: string;
}

export function TabsCategories({
  activeFilter,
  handleFilterChange,
  filterCounts,
  className,
}: TabsCategoriesProps) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {
      Filter: true,
      Categories: true,
    }
  );

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const isFilterActive = (filterId: string) => activeFilter === filterId;

  const { t } = useTranslation();

  const categories = [
    {
      name: t("Filter"),
      icon: <Filter className='h-4 w-4' />,
      filters: [
        { id: "all", name: t("All") },
        { id: "resolved", name: t("Resolved") },
      ],
    },
    {
      name: t("Categories"),
      icon: <Tag className='h-4 w-4' />,
      filters: [
        { id: "bitter_frustration", name: t("Frustration") },
        { id: "mocking", name: t("Mockery") },
        { id: "irony", name: t("Irony") },
        { id: "insulting", name: t("Insult") },
        { id: "vulgarity", name: t("Vulgarity") },
        { id: "identity_attack", name: t("Identity Attack") },
        { id: "entitlement", name: t("Entitlement") },
        { id: "impatience", name: t("Impatience") },
        { id: "threat", name: t("Threat") },
        { id: "neutral", name: t("Neutral") },
      ],
    },
  ] as const;

  return (
    <div
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur",
        className
      )}
    >
      {/* Desktop view */}
      <div className='hidden px-4 py-3 md:block'>
        <Tabs value={activeFilter} onValueChange={handleFilterChange}>
          <ScrollArea className='w-full pb-2'>
            <div className='flex flex-wrap gap-6'>
              {categories.map(category => (
                <div key={category.name} className='space-y-2'>
                  <div className='flex items-center gap-1.5'>
                    {category.icon}
                    <h3 className='text-foreground/80 text-sm font-medium'>
                      {category.name}
                    </h3>
                  </div>
                  <TabsList className='flex h-auto flex-wrap gap-2 bg-transparent p-0'>
                    {category.filters.map(filter => (
                      <TabsTrigger
                        key={filter.id}
                        value={filter.id}
                        className={cn(
                          "cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-all",
                          "data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
                          "hover:bg-muted hover:text-foreground",
                          "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none"
                        )}
                      >
                        {filter.name}
                        {filterCounts && filterCounts[filter.id] > 0 && (
                          <Badge
                            variant={
                              isFilterActive(filter.id) ? "default" : "outline"
                            }
                            className='ml-2 flex h-5 min-w-5 items-center justify-center px-1.5 py-0'
                          >
                            {filterCounts[filter.id]}
                          </Badge>
                        )}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              ))}
            </div>
            <ScrollBar orientation='horizontal' className='h-2' />
          </ScrollArea>
        </Tabs>
      </div>

      {/* Mobile view */}
      <div className='px-2 py-2 md:hidden'>
        <Tabs value={activeFilter} onValueChange={handleFilterChange}>
          {categories.map((category, index) => (
            <div key={category.name}>
              {index > 0 && <Separator className='my-2' />}
              <Collapsible
                open={openCategories[category.name]}
                onOpenChange={() => toggleCategory(category.name)}
                className='space-y-2'
              >
                <div className='flex items-center justify-between px-2 py-1'>
                  <div className='flex items-center gap-1.5'>
                    {category.icon}
                    <h3 className='text-sm font-medium'>{category.name}</h3>
                  </div>
                  <CollapsibleTrigger asChild>
                    <button className='hover:bg-muted rounded-full p-1'>
                      {openCategories[category.name] ? (
                        <ChevronUp className='h-4 w-4' />
                      ) : (
                        <ChevronDown className='h-4 w-4' />
                      )}
                    </button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <ScrollArea className='w-full pb-1'>
                    <TabsList className='flex h-auto flex-wrap gap-1.5 bg-transparent p-1'>
                      {category.filters.map(filter => (
                        <TabsTrigger
                          key={filter.id}
                          value={filter.id}
                          className={cn(
                            "rounded-full border px-2.5 py-1 text-xs transition-all",
                            "data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
                            "hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {filter.name}
                          {filterCounts && filterCounts[filter.id] > 0 && (
                            <Badge
                              variant={
                                isFilterActive(filter.id)
                                  ? "default"
                                  : "outline"
                              }
                              className='ml-1.5 flex h-4 min-w-4 items-center justify-center px-1 py-0 text-[10px]'
                            >
                              {filterCounts[filter.id]}
                            </Badge>
                          )}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <ScrollBar orientation='horizontal' className='h-1.5' />
                  </ScrollArea>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
