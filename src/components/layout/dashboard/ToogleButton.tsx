import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ToggleButton({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className='
            bg-background hover:bg-accent focus:ring-accent
            focus:ring-offset-background active:bg-accent active:shadow-accent
            absolute
            top-4
            right-[-10px]
            rounded-full p-1 shadow-md
            transition-colors
            focus:ring-2
            focus:ring-offset-2
            focus:outline-none
            active:scale-95
            active:shadow-sm
            active:transition-transform
          '
    >
      {sidebarOpen ? (
        <ChevronLeft className='text-muted-foreground size-5' />
      ) : (
        <ChevronRight className='text-muted-foreground size-5' />
      )}
    </button>
  );
}
