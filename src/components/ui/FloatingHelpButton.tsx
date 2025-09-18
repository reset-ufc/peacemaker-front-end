// src/components/ui/FloatingHelpButton.tsx
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// src/components/ui/FloatingHelpButton.tsx

export function FloatingHelpButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate("/docs")}
      initial={{ y: 0 }}
      animate={{
        y: [0, -55, 0],
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className='
        fixed
        right-6 bottom-6 z-50 cursor-pointer
        rounded-full bg-gradient-to-r from-purple-500
        to-purple-600 p-4 text-white
        shadow-xl
        transition duration-300
        hover:shadow-lg
        focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none
      '
      aria-label='Ajuda Peacemaker Bot'
    >
      <HelpCircle className='h-6 w-6' />
    </motion.button>
  );
}
