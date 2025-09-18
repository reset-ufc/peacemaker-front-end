import { useState } from "react";

import { LogOutIcon, Settings2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";

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

import { GitHubIcon } from "../svg/Github";
import { GitHubTokenModal } from "../ui/GithubTokenModal";
import { LLMSelectorModal } from "../ui/LLMSelectorModal";
import { ThresholdSelectorModal } from "../ui/ThresholdSelectorModal";

export function UserProfile() {
  const { t } = useTranslation();
  const auth = useAuthentication();
  const user = localStorage.getItem("user")!;
  const profile = JSON.parse(user) as Profile;

  const [openLLM, setOpenLLM] = useState(false);
  const [openGH, setOpenGH] = useState(false);
  const [openThreshold, setOpenThreshold] = useState(false);
  return (
    <>
      <DropdownMenu dir='ltr'>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-auto p-0 hover:bg-transparent'>
            <Avatar>
              <AvatarImage src={profile.avatar_url} alt={t("Profile image")} />
              <AvatarFallback>KK</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='max-w-64' align='end'>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpenLLM(true)}>
              <Settings2Icon className='size-4 opacity-60' aria-hidden='true' />
              <span>{t("Select LLM")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenGH(true)}>
              <GitHubIcon className='size-4 opacity-60' aria-hidden='true' />
              <span>{t("GitHub Token")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenThreshold(true)}>
              <Settings2Icon className='size-4 opacity-60' aria-hidden='true' />
              <span>{t("Threshold")}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={auth.logout}>
            <LogOutIcon size={16} className='opacity-60' aria-hidden='true' />
            <span>{t("Logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LLMSelectorModal open={openLLM} onOpenChange={setOpenLLM} />
      <GitHubTokenModal open={openGH} onOpenChange={setOpenGH} />
      <ThresholdSelectorModal
        open={openThreshold}
        onOpenChange={setOpenThreshold}
      />
    </>
  );
}
