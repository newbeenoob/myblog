"use client";

import { motion } from "framer-motion";

interface DirectoryTreeProps {
  directories?: {
    name: string;
    type: "folder" | "file";
    highlighted?: boolean;
  }[];
  aiCoreLabel?: string;
  connectorLabel?: string;
  pmThought?: string;
}

export default function DirectoryTree({
  directories = [
    { name: ".agent/", type: "folder" },
    { name: "AGENT.md", type: "file" },
    { name: "rules/", type: "folder", highlighted: true },
    { name: "workflows/", type: "folder", highlighted: true },
    { name: "prompts/", type: "folder" },
  ],
  aiCoreLabel = "AI",
  connectorLabel = "Rules-Driven",
  pmThought = "PM 思考：好的产品经理不只输出需求，更设计生产需求的“工厂”。",
}: DirectoryTreeProps) {
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 300 260" className="w-full h-full max-w-80">
        {/* Directory items */}
        {directories.map((directory, index) => (
          <motion.g
            key={directory.name}
            className="folder"
            initial={{ opacity: 0, x: -20, y: 30 + index * 35 }}
            animate={{ opacity: 1, x: 0, y: 30 + index * 35 }}
            transition={{
              delay: 0.1 * index,
              duration: 0.5,
            }}
          >
            <rect
              x="0"
              y="0"
              width={directory.highlighted ? 100 : 120}
              height="24"
              rx="4"
              className={`${directory.highlighted 
                ? "fill-primary/10 stroke-primary/40 stroke-[1]" 
                : "fill-muted/30 stroke-muted-foreground/40 stroke-[1]"}`}
            />
            <text
              x="10"
              y="16"
              className={`text-[10px] font-mono ${directory.highlighted 
                ? "fill-primary" 
                : "fill-muted-foreground"}`}
            >
              {directory.type === "folder" ? "📁" : "📄"} {directory.name}
            </text>
          </motion.g>
        ))}

        {/* Connection lines */}
        <motion.line
          x1="180"
          y1="115"
          x2="240"
          y2="115"
          className="connector-line stroke-primary/50 stroke-[1.5] fill-none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        <motion.line
          x1="180"
          y1="150"
          x2="240"
          y2="150"
          className="connector-line stroke-primary/50 stroke-[1.5] fill-none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        />

        {/* AI Core */}
        <motion.g
          className="ai-core"
          initial={{ opacity: 0, scale: 0.5, x: 250, y: 130 }}
          animate={{ opacity: 1, scale: 1, x: 250, y: 130 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <circle r="25" className="fill-primary/10 stroke-primary stroke-[1.5]" />
          <text textAnchor="middle" y="5" className="text-[12px] fill-primary font-bold">
            {aiCoreLabel}
          </text>
        </motion.g>

        {/* Connector label */}
        <motion.text
          x="230"
          y="180"
          textAnchor="middle"
          className="text-[9px] fill-muted-foreground font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {connectorLabel}
        </motion.text>

        {/* PM Thought */}
        <motion.text
          x="150"
          y="220"
          textAnchor="middle"
          className="text-[10px] fill-muted-foreground font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          {pmThought}
        </motion.text>
      </svg>
    </div>
  );
}
