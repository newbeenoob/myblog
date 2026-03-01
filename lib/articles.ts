import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  coverImage?: string;
  author?: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  published: boolean;
  coverImage?: string;
  author?: string;
  content: string;
}

function ensureDirectoryExists() {
  if (!fs.existsSync(articlesDirectory)) {
    fs.mkdirSync(articlesDirectory, { recursive: true });
  }
}

export function getArticleSlugs(): string[] {
  ensureDirectoryExists();
  const files = fs.readdirSync(articlesDirectory);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  ensureDirectoryExists();
  const filePath = path.join(articlesDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const frontmatter = data as ArticleFrontmatter;
  const stats = readingTime(content);

  return {
    slug,
    title: frontmatter.title || "Untitled",
    description: frontmatter.description || "",
    date: frontmatter.date || new Date().toISOString(),
    tags: frontmatter.tags || [],
    published: frontmatter.published ?? true,
    coverImage: frontmatter.coverImage,
    author: frontmatter.author,
    readingTime: stats.text,
    content,
  };
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .filter((article) => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return articles;
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((article) =>
    article.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const articles = getAllArticles();
  const tagsSet = new Set<string>();

  articles.forEach((article) => {
    article.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

export function searchArticles(query: string): Article[] {
  const articles = getAllArticles();
  const lowerQuery = query.toLowerCase();

  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      article.content.toLowerCase().includes(lowerQuery)
  );
}