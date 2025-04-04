import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsCategoriesProps {
  activeFilter: string;
  handleFilterChange: (value: string) => void;
}

const categories = [
  { id: "all", name: "All" },
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
  { id: "resolved", name: "Resolved" },
];

export function TabsCategories({
  activeFilter,
  handleFilterChange,
}: TabsCategoriesProps) {
  return (
    /* Category Tabs */
    <div className="flex items-start border-b py-2 ps-4">
      <Tabs value={activeFilter} onValueChange={handleFilterChange}>
        <TabsList className="flex h-auto w-full gap-1 overflow-x-auto bg-transparent p-0">
          {categories.map(category => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-secondary cursor-pointer transition-colors h-auto rounded-xl border px-3 py-1 text-sm"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
