"use client"

import { motion } from "framer-motion"
import { Github, Heart } from "lucide-react"
import { Link } from "react-router-dom"

const footerLinks = [
  {
    title: "Legal",
    items: [
      { title: "Use Terms", href: "/terms" },
      { title: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Documentation", href: "/docs" },
      { title: "GitHub Repository", href: "https://github.com/apps/thepeacemakerbot" },
    ],
  },
  {
    title: "Contact",
    items: [
      { title: "Support", href: "/support" },
      { title: "Feedback", href: "/feedback" },
    ],
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-violet-500/10 py-8 not-sm:px-4 overflow-hidden mx-28">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 blur-3xl" />
      </div>

      <div className="container mx-auto flex flex-col gap-8 pt-5">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid w-full grid-cols-1 gap-8 md:grid-cols-3"
        >
          {footerLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3"
            >
              <p className="text-xl font-semibold bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
                {link.title}
              </p>
              <div className="flex flex-col gap-2">
                {link.items.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link
                      to={item.href}
                      title={item.title}
                      className="text-muted-foreground hover:text-violet-500 transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-500"></span>
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center border-t border-violet-500/10 pt-6 mt-2"
        >
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="size-8 rounded-md bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
              P
            </div>
            <p className="text-sm text-muted-foreground">© {currentYear} PeaceMakerBot. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/apps/thepeacemakerbot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-violet-500 transition-colors duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="size-5" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="size-3 text-violet-500 mx-1 animate-pulse" /> by the PeaceMaker Team
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
