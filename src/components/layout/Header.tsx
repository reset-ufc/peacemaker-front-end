
import { motion } from "framer-motion"
import { ArrowUpRightIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Link } from "react-router-dom"
import "../../utils/i18n"

import { HeaderNav, HeaderRoot, HeaderSide } from "@/components/base/Header"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export function Header() {
  const { setTheme, resolvedTheme } = useTheme()
  const hasAuthCookie = localStorage.getItem("access_token") ?? false

  const { i18n, t } = useTranslation()

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
    .then(() => {
     console.log("Language changed to", language)
    })
    .catch((error) => {
      console.error(error)
    })
  }

  const toggleCurrentTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

  return (
    <HeaderRoot className="border-b border-violet-500/10 backdrop-blur-sm bg-background/80">
      <HeaderNav className="py-4">
        <HeaderSide className="gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/" className="flex items-center gap-2">
              <div className="size-8 rounded-md bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                P
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                PeaceMakerBot
              </h1>
            </Link>
          </motion.div>
        </HeaderSide>

        <HeaderSide className="gap-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {hasAuthCookie && (
              <Button
                asChild
                variant="outline"
                className="border-violet-500/20 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-300"
              >
                <Link to="/incivilities" className="group">
                  {t("Go to incivilities page")}
                  <ArrowUpRightIcon className="ml-2 size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </Link>
              </Button>
            )}
          </motion.div>
          <div>
          <select className="" onChange={(e) => changeLanguage(e.target.value)}>
            <option className="dark:text-black" value="en">{t("English")}</option>
            <option className="dark:text-black" value="pt">Português</option>
           </select>
           
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThemeToggle
              onClick={toggleCurrentTheme}
            />
          </motion.div>

         {!hasAuthCookie && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white border-none shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link to="/auth/sign-in/github">{t("Sign in")}</Link>
            </Button>
          </motion.div>
         )}
        </HeaderSide>
      </HeaderNav>
    </HeaderRoot>
  )
}
