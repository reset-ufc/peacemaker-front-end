import { MoonIcon, SunIcon } from "lucide-react";
import type { MouseEvent } from "react";

type ThemeToggleProps = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function ThemeToggle({ onClick = () => {} }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex size-10 items-center rounded-md justify-center border border-border"
    >
      <MoonIcon className="block dark:hidden" height="20" />
      <SunIcon className="hidden dark:block" height="20" />
    </button>
  );
}
