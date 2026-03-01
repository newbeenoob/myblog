"use client";

import { motion } from "framer-motion";
import ArticleCard, { type Article } from "./ArticleCard";

interface ArticleListProps {
  articles: Article[];
  showAll?: boolean;
}

export default function ArticleList({ articles, showAll = false }: ArticleListProps) {
  const displayArticles = showAll ? articles : articles.slice(0, 6);

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">暂无文章</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {displayArticles.map((article, index) => (
        <ArticleCard key={article.slug} article={article} index={index} />
      ))}
    </div>
  );
}