import type { MouseEvent, TouchEvent } from "react";

import { MoonIcon, SunIcon } from "lucide-react";

type ThemeToggleProps = {
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => void;
};

export function ThemeToggle({ onClick = () => {} }: ThemeToggleProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='border-border flex size-10 cursor-pointer items-center justify-center rounded-md border'
    >
      <MoonIcon className='block dark:hidden' height='20' />
      <SunIcon className='hidden dark:block' height='20' />
    </button>
  );
}
