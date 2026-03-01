"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  title: string;
  company?: string;
  location?: string;
  date: string;
  description?: string;
  tags?: string[];
  type: "work" | "education" | "project";
}

interface TimelineProps {
  items: TimelineItem[];
}

const typeConfig = {
  work: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
  },
  education: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
  },
  project: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
  },
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/50 transform md:-translate-x-1/2" />

      {/* Timeline items */}
      <div className="space-y-12">
        {items.map((item, index) => {
          const config = typeConfig[item.type];
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center text-white shadow-lg transform -translate-x-1/2 z-10`}
              >
                {config.icon}
              </motion.div>

              {/* Content */}
              <div
                className={`w-full md:w-[calc(50%-2rem)] ml-16 md:ml-0 ${
                  isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}
              >
                <div
                  className={`relative p-6 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 ${
                    isEven ? "md:text-right" : ""
                  }`}
                >
                  {/* Date badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} mb-3`}
                  >
                    <time className="text-foreground/80">{item.date}</time>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>

                  {/* Company/Location */}
                  {(item.company || item.location) && (
                    <p className="text-muted-foreground mb-2">
                      {item.company}
                      {item.company && item.location && " · "}
                      {item.location}
                    </p>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="text-muted-foreground mb-3 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div
                      className={`flex flex-wrap gap-2 ${
                        isEven ? "md:justify-end" : ""
                      }`}
                    >
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}