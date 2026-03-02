"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface QRCodeProps {
  url?: string;
  imageSrc?: string;
  title?: string;
  description?: string;
}

export default function QRCode({
  url = "https://andrews-meditations.com",
  imageSrc = "/images/QRcode.png",
  title = "关注公众号",
  description = "扫码关注我的公众号",
}: QRCodeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <div className="bg-white p-3 rounded-lg shadow-inner">
          <Image
            src={imageSrc}
            alt={title}
            width={252}
            height={252}
            className="block"
          />
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