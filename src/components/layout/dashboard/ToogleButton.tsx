import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ToggleButton({  sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) {
  return(
    <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="
            absolute top-4 right-[-10px]
            p-1 rounded-full shadow-md
            transition-colors
            bg-background
            hover:bg-accent
            focus:outline-none focus:ring-2 focus:ring-accent
            focus:ring-offset-2
            focus:ring-offset-background
            active:scale-95
            active:bg-accent
            active:shadow-sm
            active:shadow-accent
            active:transition-transform
          "
        >
          {sidebarOpen ? (
            <ChevronLeft className="size-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="size-5 text-muted-foreground" />
          )}
        </button>

  )
}
