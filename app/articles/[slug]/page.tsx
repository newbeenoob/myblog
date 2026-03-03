import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: [article.author || "Andrew"],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const formattedDate = format(new Date(article.date), "yyyy年MM月dd日", {
    locale: zhCN,
  });

  // Simple markdown to HTML conversion for display
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent = "";
    let codeLanguage = "";
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];
    let currentTableRow: string[] = [];

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
          codeContent = "";
        } else {
          inCodeBlock = false;
          elements.push(
            <pre
              key={index}
              className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto my-4"
            >
              <code className="text-sm font-mono">{codeContent}</code>
            </pre>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += (codeContent ? "\n" : "") + line;
        return;
      }

      // Tables
      if (line.includes("|")) {
        // Check if it's a table header or row
        const cells = line.split("|").map(cell => cell.trim()).filter(cell => cell);
        if (cells.length > 0) {
          // Check if it's a separator line
          if (line.includes("---")) {
            inTable = true;
            return;
          } else if (inTable && tableHeaders.length === 0) {
            tableHeaders = cells;
            return;
          } else if (inTable) {
            tableRows.push(cells);
            return;
          }
        }
      }

      // End of table
      if (inTable && line.trim() === "") {
        inTable = false;
        // Render table
        elements.push(
          <div key={index} className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted/50">
                  {tableHeaders.map((header, headerIndex) => (
                    <th key={headerIndex} className="border border-border px-4 py-2 text-left font-semibold">
                      {renderInlineFormatting(header)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-border px-4 py-2">
                        {renderInlineFormatting(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        // Reset table variables
        tableHeaders = [];
        tableRows = [];
        return;
      }

      // Headers
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={index} className="text-3xl font-bold mt-8 mb-4 first:mt-0">
            {line.slice(2)}
          </h1>
        );
        return;
      }
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">
            {line.slice(3)}
          </h2>
        );
        return;
      }
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
            {line.slice(4)}
          </h3>
        );
        return;
      }
      if (line.startsWith("#### ")) {
        elements.push(
          <h4 key={index} className="text-lg font-semibold mt-4 mb-2">
            {line.slice(5)}
          </h4>
        );
        return;
      }

      // Images
      if (line.startsWith("![")) {
        const match = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          const alt = match[1];
          const src = match[2];
          elements.push(
            <figure key={index} className="my-6">
              <img 
                src={src} 
                alt={alt} 
                className="w-full h-auto rounded-lg" 
              />
              {alt && (
                <figcaption className="text-center text-sm text-muted-foreground mt-2">
                  {alt}
                </figcaption>
              )}
            </figure>
          );
          return;
        }
      }

      // Blockquote
      if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={index}
            className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-4"
          >
            {line.slice(2)}
          </blockquote>
        );
        return;
      }

      // Horizontal rule
      if (line === "---") {
        elements.push(
          <hr key={index} className="my-8 border-border" />
        );
        return;
      }

      // Empty lines
      if (line.trim() === "") {
        return;
      }

      // List items
      if (line.startsWith("- ") || line.startsWith("+ ")) {
        elements.push(
          <li key={index} className="ml-6 mb-2 list-disc">
            {renderInlineFormatting(line.slice(2))}
          </li>
        );
        return;
      }
      if (/^\d+\. /.test(line)) {
        const content = line.replace(/^\d+\. /, "");
        elements.push(
          <li key={index} className="ml-6 mb-2 list-decimal">
            {renderInlineFormatting(content)}
          </li>
        );
        return;
      }

      // Regular paragraphs
      elements.push(
        <p key={index} className="mb-4 leading-relaxed">
          {renderInlineFormatting(line)}
        </p>
      );
    });

    return elements;
  };

  // Link validation function
  const validateLink = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const renderInlineFormatting = (text: string): React.ReactNode => {
    // Bold
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italic
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Inline code
    text = text.replace(/`([^`]+)`/g, "<code class='bg-muted px-1.5 py-0.5 rounded text-sm font-mono'>$1</code>");
    // Links with validation
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        if (validateLink(url)) {
          return `<a href='${url}' target='_blank' rel='noopener noreferrer' class='text-primary hover:text-primary/80 underline underline-offset-4 flex items-center gap-1'>${text} <svg class='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 10'></path></svg></a>`;
        } else {
          return `<span class='text-muted-foreground'>${text}</span>`;
        }
      });

    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <article className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
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
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          返回文章列表
        </Link>

        {/* Article header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <time dateTime={article.date}>{formattedDate}</time>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>{article.readingTime}</span>
            {article.author && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                <span>{article.author}</span>
              </>
            )}
          </div>
        </header>

        {/* Article content */}
        <div className="prose-custom">
          {renderContent(article.content)}
        </div>

        {/* Article footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="font-semibold">{article.author || "Andrew"}</p>
                <p className="text-sm text-muted-foreground">产品思考者</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/articles"
                className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-300"
              >
                查看更多文章
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}