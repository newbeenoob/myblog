"use client";

import { useLanguage } from "./LanguageContext";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
      className="p-2 rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-center"
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${language === "zh" ? "English" : "中文"}`}
      title={language === "zh" ? "Switch to English" : "切换到中文"}
    >
      <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        {language === "zh" ? "EN" : "中"}
      </span>
    </motion.button>
  );
}