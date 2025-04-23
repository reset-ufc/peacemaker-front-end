import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, Filter, Tag } from "lucide-react"
import { useState } from "react"

interface TabsCategoriesProps {
  activeFilter: string
  handleFilterChange: (value: string) => void
  filterCounts?: Record<string, number>
  className?: string
}

const categories = [
  {
    name: "Filter",
    icon: <Filter className="h-4 w-4" />,
    filters: [
      { id: "all", name: "All" },
      { id: "resolved", name: "Resolved" },
    ],
  },
  {
    name: "Categories",
    icon: <Tag className="h-4 w-4" />,
    filters: [
      { id: "bitter_frustration", name: "Frustration" },
      { id: "mocking", name: "Mockery" },
      { id: "irony", name: "Irony" },
      { id: "insulting", name: "Insult" },
      { id: "vulgarity", name: "Vulgarity" },
      { id: "identity_attack", name: "Identity Attack" },
      { id: "entitlement", name: "Entitlement" },
      { id: "impatience", name: "Impatience" },
      { id: "threat", name: "Threat" },
      { id: "neutral", name: "Neutral" },
    ],
  },
] as const

export function TabsCategories({ activeFilter, handleFilterChange, filterCounts, className }: TabsCategoriesProps) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    Filter: true,
    Categories: true,
  })

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const isFilterActive = (filterId: string) => activeFilter === filterId

  return (
    <div
      className={cn("border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}
    >
      {/* Desktop view */}
      <div className="hidden md:block px-4 py-3">
        <Tabs value={activeFilter} onValueChange={handleFilterChange}>
          <ScrollArea className="w-full pb-2">
            <div className="flex flex-wrap gap-6">
              {categories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    {category.icon}
                    <h3 className="text-sm font-medium text-foreground/80">{category.name}</h3>
                  </div>
                  <TabsList className="bg-transparent h-auto p-0 flex flex-wrap gap-2">
                    {category.filters.map((filter) => (
                      <TabsTrigger
                        key={filter.id}
                        value={filter.id}
                        className={cn(
                          "rounded-full cursor-pointer border px-3 py-1.5 text-sm transition-all",
                          "data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
                          "hover:bg-muted hover:text-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        )}
                      >
                        {filter.name}
                        {filterCounts && filterCounts[filter.id] > 0 && (
                          <Badge
                            variant={isFilterActive(filter.id) ? "default" : "outline"}
                            className="ml-2 px-1.5 py-0 h-5 min-w-5 flex items-center justify-center"
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
            <ScrollBar orientation="horizontal" className="h-2" />
          </ScrollArea>
        </Tabs>
      </div>

      {/* Mobile view */}
      <div className="md:hidden px-2 py-2">
        <Tabs value={activeFilter} onValueChange={handleFilterChange}>
          {categories.map((category, index) => (
            <div key={category.name}>
              {index > 0 && <Separator className="my-2" />}
              <Collapsible
                open={openCategories[category.name]}
                onOpenChange={() => toggleCategory(category.name)}
                className="space-y-2"
              >
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="flex items-center gap-1.5">
                    {category.icon}
                    <h3 className="text-sm font-medium">{category.name}</h3>
                  </div>
                  <CollapsibleTrigger asChild>
                    <button className="rounded-full p-1 hover:bg-muted">
                      {openCategories[category.name] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <ScrollArea className="w-full pb-1">
                    <TabsList className="bg-transparent h-auto p-1 flex flex-wrap gap-1.5">
                      {category.filters.map((filter) => (
                        <TabsTrigger
                          key={filter.id}
                          value={filter.id}
                          className={cn(
                            "rounded-full border px-2.5 py-1 text-xs transition-all",
                            "data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
                            "hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {filter.name}
                          {filterCounts && filterCounts[filter.id] > 0 && (
                            <Badge
                              variant={isFilterActive(filter.id) ? "default" : "outline"}
                              className="ml-1.5 px-1 py-0 h-4 min-w-4 text-[10px] flex items-center justify-center"
                            >
                              {filterCounts[filter.id]}
                            </Badge>
                          )}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <ScrollBar orientation="horizontal" className="h-1.5" />
                  </ScrollArea>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
