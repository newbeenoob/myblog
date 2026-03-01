"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function ContactPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200 flex items-center gap-1.5"
        whileTap={{ scale: 0.95 }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span className="hidden sm:inline">{t("contact.button")}</span>
      </motion.button>

      {/* Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-72 z-50"
          >
            {/* Triangle arrow */}
            <div className="absolute -top-2 right-4 w-4 h-4 rotate-45 bg-slate-800 dark:bg-slate-900 border-l border-t border-slate-700" />

            {/* Content card */}
            <div className="relative bg-slate-800 dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-700 overflow-hidden">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 p-1.5 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
                aria-label="Close"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="p-4 pt-3">
                <h3 className="text-white font-semibold text-center mb-3 pr-6">
                  {t("contact.title")}
                </h3>

                {/* QR Code placeholder */}
                <div className="bg-white rounded-lg p-3 mb-3">
                  <div className="w-full aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                    {/* Placeholder QR code pattern */}
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full p-2"
                    >
                      {/* Position patterns */}
                      <rect x="5" y="5" width="25" height="25" fill="#000" rx="3" />
                      <rect x="10" y="10" width="15" height="15" fill="#fff" rx="2" />
                      <rect x="13" y="13" width="9" height="9" fill="#000" rx="1" />

                      <rect x="70" y="5" width="25" height="25" fill="#000" rx="3" />
                      <rect x="75" y="10" width="15" height="15" fill="#fff" rx="2" />
                      <rect x="78" y="13" width="9" height="9" fill="#000" rx="1" />

                      <rect x="5" y="70" width="25" height="25" fill="#000" rx="3" />
                      <rect x="10" y="75" width="15" height="15" fill="#fff" rx="2" />
                      <rect x="13" y="78" width="9" height="9" fill="#000" rx="1" />

                      {/* Data pattern (simplified) */}
                      <rect x="35" y="5" width="5" height="5" fill="#000" rx="1" />
                      <rect x="45" y="5" width="5" height="5" fill="#000" rx="1" />
                      <rect x="55" y="5" width="5" height="5" fill="#000" rx="1" />
                      <rect x="35" y="15" width="5" height="5" fill="#000" rx="1" />
                      <rect x="50" y="15" width="5" height="5" fill="#000" rx="1" />
                      <rect x="60" y="15" width="5" height="5" fill="#000" rx="1" />

                      <rect x="35" y="35" width="30" height="30" fill="#000" rx="4" />
                      <rect x="40" y="40" width="20" height="20" fill="#fff" rx="3" />
                      <text x="50" y="55" textAnchor="middle" fontSize="10" fill="#000" fontWeight="bold">A</text>

                      {/* More data patterns */}
                      <rect x="5" y="35" width="5" height="5" fill="#000" rx="1" />
                      <rect x="15" y="40" width="5" height="5" fill="#000" rx="1" />
                      <rect x="5" y="50" width="5" height="5" fill="#000" rx="1" />
                      <rect x="20" y="55" width="5" height="5" fill="#000" rx="1" />

                      <rect x="75" y="40" width="5" height="5" fill="#000" rx="1" />
                      <rect x="85" y="45" width="5" height="5" fill="#000" rx="1" />
                      <rect x="70" y="55" width="5" height="5" fill="#000" rx="1" />
                      <rect x="80" y="60" width="5" height="5" fill="#000" rx="1" />

                      <rect x="40" y="75" width="5" height="5" fill="#000" rx="1" />
                      <rect x="50" y="80" width="5" height="5" fill="#000" rx="1" />
                      <rect x="60" y="75" width="5" height="5" fill="#000" rx="1" />
                      <rect x="70" y="85" width="5" height="5" fill="#000" rx="1" />
                      <rect x="85" y="75" width="5" height="5" fill="#000" rx="1" />
                    </svg>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm text-center leading-relaxed">
                  {t("contact.description")}
                  <br />
                  {t("contact.description2")}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}