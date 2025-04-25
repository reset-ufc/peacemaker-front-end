"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ArrowRight, CloudUpload, Fingerprint, Lock, RefreshCw, Sparkles, type LucideIcon } from "lucide-react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

import "../../utils/i18n"
type Feature = {
  name: string
  description: string
  icon: LucideIcon
  link?: string
  color?: string
}



export function Features() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 })

  const { t } = useTranslation()

  const features: Array<Feature> = [
    {
      name: t("Ease Installation"),
      description: t("To get the bot working in your repository all you need to do is install it on Github Marketplace."),
      icon: CloudUpload,
      link: "https://github.com/apps/thepeacemakerbot",
      color: "from-violet-600 to-purple-500",
    },
    {
      name: t("GitHub Integration"),
      description: t("You can access your incivilized comments and repositories analysis by logging in with your Github account."),
      icon: Lock,
      color: "from-purple-600 to-fuchsia-500",
    },
    {
      name: t("Fast and Simple"),
      description: t("The bot is very easy to use and doesn't require any configuration, with the analysis of the comments starting automatically."),
      icon: RefreshCw,
      color: "from-indigo-500 to-violet-600",
    },
    {
      name: t("No intrusive politics"),
      description: t("The bot doesn't interfere with your comments."),
      icon: Fingerprint,
      color: "from-fuchsia-500 to-purple-700",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" ref={containerRef}>
      <motion.div className="absolute inset-0 -z-10 opacity-[0.08]" style={{ y: backgroundY }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-700 blur-3xl" />
        <div className="absolute top-2/3 right-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 blur-3xl" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          className="mx-auto max-w-2xl lg:text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isTitleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mb-6 flex justify-center"
          >
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm font-medium border-violet-500/30 bg-violet-500/10 text-violet-500 backdrop-blur-sm"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-pulse text-violet-400" />
              {t("Moderate your repositories")}
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="inline-block">The Peacemaker</span>{" "}
            <span className="inline-block bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
              {t("keeps your GitHub community civil")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground mt-6 text-lg leading-8 max-w-3xl mx-auto"
          >
            {t("A non-intrusive Github bot that helps you manage your repositories issues and pull requests with AI-powered moderation.")}
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-5xl">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 lg:gap-y-16"
            style={{ gridAutoRows: "1fr" }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="group relative"
              >
                <div className="relative rounded-2xl border border-violet-500/10 bg-card/50 backdrop-blur-sm p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
                        feature.color || "from-violet-600 to-purple-500",
                      )}
                    >
                      <feature.icon className="text-white size-7" />
                    </motion.div>
                    <h3 className="ml-5 text-xl font-semibold text-foreground group-hover:text-violet-500 transition-colors duration-300">
                      {feature.name}
                    </h3>
                  </div>

                  <p className="mt-5 text-gray-400 text-base leading-7 flex-grow">{feature.description}</p>

                  {feature.link && (
                    <motion.a
                      href={feature.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center text-sm font-medium text-violet-500 hover:text-violet-600 transition-colors self-start"
                      whileHover={{ x: 5 }}
                    >
                      {t("Learn more")} 
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </motion.a>
                  )}

                  <motion.div
                    className="absolute -z-10 inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to bottom right, var(--${feature.color?.split(" ")[0].substring(5)}, var(--${feature.color?.split(" ")[1].substring(3)})`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
