"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  published: boolean;
}

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const formattedDate = format(new Date(article.date), "yyyy年MM月dd日", {
    locale: zhCN,
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/articles/${article.slug}`}>
        <div className="relative p-6 rounded-xl border border-border/50 bg-card hover:bg-muted/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            {/* Date and reading time */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
              <time dateTime={article.date}>{formattedDate}</time>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>{article.readingTime}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.6rem]">
              {article.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed min-h-[3.6rem]">
              {article.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow indicator */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}