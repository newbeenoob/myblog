"use client";

import ArticleList from "./ArticleList";
import { useLanguage } from "./LanguageContext";
import { Article } from "./ArticleCard";
import { useState } from "react";

interface ArticlesContentProps {
  articles: Article[];
  tags: string[];
}

export default function ArticlesContent({ articles, tags }: ArticlesContentProps) {
  const { t } = useLanguage();
  const [selectedTag, setSelectedTag] = useState<string>("all");

  // Filter articles based on selected tag
  const filteredArticles = selectedTag === "all"
    ? articles
    : articles.filter((article) => article.tags.includes(selectedTag));

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">{t("articles.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {t("articles.description")}
          </p>
        </header>

        {/* Tags Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <span
              key="all"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${selectedTag === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
              onClick={() => setSelectedTag("all")}
            >
              {t("articles.all")}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${selectedTag === tag ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <ArticleList articles={filteredArticles} showAll />
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold mb-2">{t("articles.empty")}</h2>
            <p className="text-muted-foreground">
              {t("articles.emptyHint")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}