import { LogOutIcon, LucideIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthentication } from "@/hooks/use-authentication";
import { Profile } from "@/types";

const userOptions: Array<{ option: string; href: string; icon?: LucideIcon }> =
  [
    {
      option: "A short option",
      href: "#",
    },
    {
      option: "A super long option that will wrap to a new line",
      href: "#",
    },
  ];

export function UserProfile() {
  const auth = useAuthentication();
  const user = localStorage.getItem("user")!;
  const profile = JSON.parse(user) as unknown as Profile;

  return (
    <DropdownMenu dir='ltr'>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-auto p-0 hover:bg-transparent'>
          <Avatar>
            <AvatarImage src={profile.avatar_url} alt='Profile image' />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='max-w-64' align='end'>
        <DropdownMenuGroup>
          {userOptions.map(op => (
            <DropdownMenuItem key={op.option}>
              {op.icon && (
                <op.icon className='size-4 opacity-60' aria-hidden='true' />
              )}
              <span>{op.option}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={auth.logout}>
          <LogOutIcon size={16} className='opacity-60' aria-hidden='true' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
