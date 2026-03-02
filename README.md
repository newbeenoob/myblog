# 安德鲁的沉思录

一个基于 Next.js 14 构建的个人品牌博客网站。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动效**: Framer Motion
- **主题**: next-themes (深浅模式切换)
- **内容**: Markdown + gray-matter

## 开始使用

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 项目结构

```
myBlog/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── articles/          # 文章页
│   ├── resume/            # 履历页
│   └── rss.xml/           # RSS 订阅
├── components/            # React 组件
├── lib/                   # 工具函数
├── content/               # Markdown 文章
│   └── articles/
└── public/                # 静态资源
```

## 功能特性

- 🎨 深浅主题切换
- 📱 响应式设计
- ✨ 流畅动效
- 📝 Markdown 博客
- 🔍 SEO 优化
- 📡 RSS 订阅
- 🗺️ 站点地图

## 许可证

MIT License