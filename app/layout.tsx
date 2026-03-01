import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "安德鲁的产品思考 | Andrew's Product Thoughts",
    template: "%s | 安德鲁的产品思考",
  },
  description: "一个关于产品、用户体验与商业的个人博客。探索产品设计的奥秘，分享产品思考，记录职业成长。",
  keywords: [
    "博客",
    "产品经理",
    "产品设计",
    "用户体验",
    "数据分析",
    "商业策略",
    "产品思考",
    "职业成长",
    "安德鲁",
    "Andrew",
  ],
  authors: [{ name: "Andrew" }],
  creator: "Andrew",
  publisher: "Andrew",
  metadataBase: new URL("https://andrews-meditations.com"),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "安德鲁的产品思考",
    title: "安德鲁的产品思考 | Andrew's Product Thoughts",
    description: "一个关于产品、用户体验与商业的个人博客。探索产品设计的奥秘，分享产品思考，记录职业成长。",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        alt: "安德鲁的产品思考",
      },
    ],
  },
  twitter: {
    title: "安德鲁的产品思考 | Andrew's Product Thoughts",
    description: "一个关于产品、用户体验与商业的个人博客。探索产品设计的奥秘，分享产品思考，记录职业成长。",
    images: ["/images/og-image.jpg"],
    creator: "@andrew",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}