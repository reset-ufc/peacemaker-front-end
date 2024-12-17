import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IncivilitiesDetails } from "./incivilities-details";
import { IncivilitiesDisplay } from "./incivilities-display"; // Import the display component

export interface Incivility {
  repo_name: string;
  id: string;
  comment: string;
  classification_type: string;
  resolved: boolean;
  created_at: string;
  read: boolean;
}

interface IncivilitiesProps {
  incivilities: Array<Incivility>;
}

export function Incivilities({ incivilities }: IncivilitiesProps) {
  return (
    <section className="flex flex-row  border-red-500">
      <div className="w-1/3 min-w-64 border">
        <Tabs defaultValue="all">
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">Incivilities</h1>
            <TabsList className="ml-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="resolved">Solved</TabsTrigger>
              <TabsTrigger value="not-resolved">Not solved</TabsTrigger>
              <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          {/* <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
						<form>
							<div className="relative">
								<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input placeholder="Search" className="pl-8" />
							</div>
						</form>
					</div> */}
          <ScrollArea>
            <TabsContent value="all" className="m-0">
              <IncivilitiesDetails incivilities={incivilities} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <IncivilitiesDetails incivilities={incivilities} />
            </TabsContent>
            <TabsContent value="resolved" className="m-0">
              <IncivilitiesDetails incivilities={incivilities} />
            </TabsContent>
            <TabsContent value="not-resolved" className="m-0">
              <IncivilitiesDetails incivilities={incivilities} />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
      <div className="w-2/3 border">
        <IncivilitiesDisplay incivilities={incivilities[0] as Incivility} />
      </div>
    </section>
  );
}
