"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface QRCodeProps {
  url?: string;
  title?: string;
  description?: string;
}

export default function QRCode({
  url = "https://andrews-meditations.com",
  title = "扫码访问",
  description = "在手机上阅读更方便",
}: QRCodeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate QR code using a simple pattern (for demo purposes)
  // In production, you'd use a real QR code library
  const generateQRPattern = () => {
    const size = 21;
    const pattern = [];
    const modules: { row: number; col: number; filled: boolean }[] = [];

    // Create position patterns
    const addPositionPattern = (row: number, col: number) => {
      for (let r = -1; r <= 7; r++) {
        for (let c = -1; c <= 7; c++) {
          const dr = row + r;
          const dc = col + c;
          if (dr >= 0 && dr < size && dc >= 0 && dc < size) {
            const isOuter = r <= 0 || r >= 7 || c <= 0 || c >= 7;
            const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
            modules.push({ row: dr, col: dc, filled: isOuter || isInner });
          }
        }
      }
    };

    addPositionPattern(0, 0);
    addPositionPattern(0, size - 7);
    addPositionPattern(size - 7, 0);

    // Fill remaining with pseudo-random pattern based on URL
    const seed = url.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const exists = modules.some((m) => m.row === r && m.col === c);
        if (!exists) {
          const filled = ((r * size + c + seed) % 3) === 0;
          modules.push({ row: r, col: c, filled });
        }
      }
    }

    return modules;
  };

  const modules = generateQRPattern();
  const moduleSize = 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-6 rounded-xl border border-border/50 bg-card"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      <div className="relative">
        {/* QR Code container */}
        <div
          className="bg-white p-3 rounded-lg shadow-inner"
          style={{ width: modules.length > 0 ? 21 * moduleSize + 24 : 0 }}
        >
          <svg
            width={21 * moduleSize}
            height={21 * moduleSize}
            className="block"
          >
            {modules.map((m, i) => (
              <rect
                key={i}
                x={m.col * moduleSize}
                y={m.row * moduleSize}
                width={moduleSize}
                height={moduleSize}
                fill={m.filled ? "#000" : "#fff"}
              />
            ))}
          </svg>
        </div>

        {/* Center logo overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center">
            <span className="text-xl font-serif font-bold gradient-text">A</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center max-w-xs">
        {url}
      </p>
    </motion.div>
  );
}