import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { HeaderNav, HeaderRoot, HeaderSide } from "@/components/base/Header";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";

import "../../utils/i18n";

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const hasAuthCookie = localStorage.getItem("access_token") ?? false;

  const { i18n, t } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n
      .changeLanguage(language)
      .then(() => {
        console.log("Language changed to", language);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <HeaderRoot className='bg-background/80 border-b border-violet-500/10 backdrop-blur-sm'>
      <HeaderNav className='py-4'>
        <HeaderSide className='gap-8'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to='/' className='flex items-center gap-2'>
              <div className='flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-violet-600 to-purple-500 text-lg font-bold text-white shadow-md'>
                P
              </div>
              <h1 className='bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-xl font-bold text-transparent'>
                PeaceMakerBot
              </h1>
            </Link>
          </motion.div>
        </HeaderSide>

        <HeaderSide className='gap-3'>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {hasAuthCookie && (
              <Button
                asChild
                variant='outline'
                className='border-violet-500/20 transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/5'
              >
                <Link to='/incivilities' className='group'>
                  {t("Go to incivilities page")}
                  <ArrowUpRightIcon className='ml-2 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </Link>
              </Button>
            )}
          </motion.div>
          <div>
            <select className='' onChange={e => changeLanguage(e.target.value)}>
              <option className='dark:text-black' value='en'>
                {t("English")}
              </option>
              <option className='dark:text-black' value='pt'>
                Português
              </option>
            </select>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThemeToggle onClick={toggleCurrentTheme} />
          </motion.div>

          {!hasAuthCookie && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className='border-none bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-md transition-all duration-300 hover:from-violet-700 hover:to-purple-600 hover:shadow-lg'
              >
                <Link to='/auth/sign-in/github'>{t("Sign in")}</Link>
              </Button>
            </motion.div>
          )}
        </HeaderSide>
      </HeaderNav>
    </HeaderRoot>
  );
}
