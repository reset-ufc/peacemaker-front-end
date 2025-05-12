// src/components/ui/FloatingHelpButton.tsx
"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function FloatingHelpButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate("/docs")}
      initial={{ y: 0 }}
      animate={{
        y: [0, -55, 0],
        scale: [1, 1.15, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="
        cursor-pointer
        fixed bottom-6 right-6 z-50
        bg-gradient-to-r from-purple-500 to-purple-600
        text-white p-4 rounded-full
        hover:shadow-lg
        transition duration-300
        shadow-xl
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
      "
      aria-label="Ajuda Peacemaker Bot"
    >
      <HelpCircle className="w-6 h-6" />
    </motion.button>
  );
}
