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
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="
        fixed bottom-6 right-6 z-50
        bg-indigo-600 hover:bg-indigo-700
        text-white p-4 rounded-full
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
