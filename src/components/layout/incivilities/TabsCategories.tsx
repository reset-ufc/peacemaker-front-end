import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsCategoriesProps {
  activeFilter: string;
  handleFilterChange: (value: string) => void;
}

const categories = [
  {
    name: "Filter",
    filters: [
      { id: "all", name: "All" },
      { id: "resolved", name: "Resolved" },
    ],
  },
  {
    name: "Categories",
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
] as const;

export function TabsCategories({
  activeFilter,
  handleFilterChange,
}: TabsCategoriesProps) {
  return (
    /* Category Tabs */
    <div className='flex items-start border-b ps-4 pt-1 pb-2'>
      <Tabs value={activeFilter} onValueChange={handleFilterChange}>
        <TabsList className='flex h-auto w-full gap-x-1.5 overflow-x-auto bg-transparent px-2'>
          {categories.map(category => (
            <div key={category.name} className='flex flex-col gap-y-1'>
              <p className='pb-px text-sm font-medium'>{category.name}</p>
              <div className='flex flex-row gap-x-1.5'>
                {category.filters.map(filter => (
                  <TabsTrigger
                    key={filter.id}
                    value={filter.id}
                    className='data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-secondary h-auto cursor-pointer rounded-xl border px-3 py-1 text-sm transition-colors'
                  >
                    {filter.name}
                  </TabsTrigger>
                ))}
              </div>
            </div>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
