"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.08, // Set to meet the 0.01-0.09s requested lag
        ease: "linear" 
      }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}