"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PromptModal from "./PromptModal";

interface SectionCardProps {
  number: number;
  title: string;
  principle: string;
  pmThought: string;
  promptTitle: string;
  promptContent: string;
  illustration: React.ReactNode;
  reversed?: boolean;
}

export default function SectionCard({
  number,
  title,
  principle,
  pmThought,
  promptTitle,
  promptContent,
  illustration,
  reversed = false,
}: SectionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`flex flex-col ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-8 lg:gap-12 items-center py-12 lg:py-16`}
      >
        {/* Text content */}
        <div className="flex-1 space-y-4">
          {/* Number badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              {number}
            </span>

            {/* Prompt button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
              aria-label="View prompt"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Prompt
            </button>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-foreground">
              {title}
            </h3>
          </div>

          {/* Principle */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-sm text-foreground/90 leading-relaxed">
              <span className="font-medium text-primary">设计原则：</span>
              {principle}
            </p>
          </div>

          {/* PM Thought */}
          <div className="flex items-start gap-3 text-muted-foreground">
            <div className="flex-shrink-0 w-5 h-5 mt-0.5 text-primary/60">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="text-sm italic leading-relaxed">
              {pmThought}
            </p>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[400px] aspect-square flex items-center justify-center">
            {illustration}
          </div>
        </div>
      </motion.div>

      {/* Prompt Modal */}
      <PromptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={promptTitle}
        prompt={promptContent}
      />
    </>
  );
}