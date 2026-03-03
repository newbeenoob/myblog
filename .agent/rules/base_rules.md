# 1. 文件与写作规范

## 1.1 字体规范
- 设计稿/文档排版时优先使用等线字体（如：PingFang SC、Microsoft YaHei、Roboto）
- 代码块使用等宽字体（如：Consolas、Menlo、Monaco）

## 1.2 中英文空格
- 中英文之间保留一个空格
- 中文与数字之间保留一个空格
- 英文标点与中文之间保留一个空格

## 1.3 代码块规范
- 所有代码块必须使用三反引号包裹
- 必须指定代码语言（如：`javascript`、`python`）
- 代码缩进统一为 2 个空格或 1 个 Tab

## 1.4 标题层级与列表缩进
- 标题层级使用 `#` 标记，最多支持 6 级
- 列表统一使用 `- ` 或 `1. ` 标记
- 嵌套列表缩进统一为 2 个空格

## 1.5 输出结构模板

### PRD 问题拆解模板
```
# 问题描述
- 背景：
- 痛点：
- 目标：

# 解决方案
- 核心思路：
- 关键功能：
- 边界约束：
```

### 方案评审模板
```
# 方案概述
- 目标：
- 核心逻辑：

# 优缺点分析
- 优点：
- 缺点：

# 风险评估
- 技术风险：
- 业务风险：
```


# 2. 协作方式

## 2.1 任务开始前
- 先复述目标：明确要解决的问题
- 明确产出物：说明最终交付的内容
- 定义边界：说明哪些内容不在本次任务范围内

## 2.2 执行中
- 遇到歧义时，使用【待确认】标记，并说明需要确认的内容
- 无法确定的信息，不要瞎猜，使用【待确认】占位

## 2.3 交付前
- 必须自检“需求覆盖”：逐条检查是否完成所有需求
- 检查是否符合写作规范：字体、空格、代码块、标题层级等

## 2.4 交付后
- 默认提供“可选优化建议”：针对当前任务给出可改进的方向
- 当用户说“直接修复/干就完事”等表达时，切换到“快速执行模式”，停止扩展建议，直接执行

# 3. 自检机制

## 3.1 需求覆盖检查
- [ ] 是否完成所有需求
- [ ] 是否存在遗漏的功能点
- [ ] 是否符合用户的期望

## 3.2 风格规范检查
- [ ] 中英文之间是否保留空格
- [ ] 代码块是否使用三反引号
- [ ] 列表缩进是否统一
- [ ] 标题层级是否正确

## 3.3 风险/假设披露
- [ ] 是否存在未确认的歧义
- [ ] 是否存在技术风险
- [ ] 是否存在业务风险

# 4. 前端开发规范

## 4.1 技术栈标准

### 核心框架
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: GSAP (SVG/复杂动画) + Framer Motion (UI 动画)
- **主题**: next-themes
- **内容**: Markdown + gray-matter

### 依赖安装注意
- react-leaflet 存在 peer dependency 冲突，使用 `--legacy-peer-deps` 标志
- 客户端专用库使用 `next/dynamic` 配合 `ssr: false` 避免 SSR 错误

## 4.2 组件设计规范

### 客户端/服务端组件分离
```
// 服务端组件 (默认)
// - 数据获取 (fs, fetch)
// - 直接访问后端资源
// - 无 "use client" 指令

// 客户端组件
// - 使用 useState, useEffect, useRef
// - 事件处理 (onClick, onChange)
// - 浏览器 API (window, localStorage)
// - 必须在文件顶部添加 "use client"
```

### 动态导入模式 (解决 SSR 问题)
```tsx
// Leaflet 等浏览器专用库
const ResidenceMapCard = dynamic(() => import("./ResidenceMapCard"), {
  ssr: false,
  loading: () => <div>加载中...</div>,
});
```

### 组件命名约定
- 页面组件: `Page.tsx` (如 `HomeContent.tsx`)
- UI 组件: 功能描述 (如 `TagMarquee.tsx`, `Timeline.tsx`)
- 插画组件: 语义化命名 (如 `MobiusLoop.tsx`, `EarsFunnel.tsx`)

## 4.3 主题与样式规范

### CSS 变量 (globals.css)
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --border: 214.3 31.8% 91.4%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --border: 217.2 32.6% 17.5%;
}
```

### Tailwind 类名约定
- 主题色: `bg-background`, `text-foreground`, `text-muted-foreground`
- 边框: `border-border`, `border-primary/30`
- 背景: `bg-muted/20`, `bg-card`
- 渐变: 自定义 `gradient-text` 类

### 主题切换实现
```tsx
// layout.tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>

// 组件中
const { theme, setTheme } = useTheme();
```

## 4.4 国际化规范

### 多语言架构
```tsx
// LanguageContext.tsx
type Language = "zh" | "en";

const translations: Record<Language, Record<string, string>> = {
  zh: { "nav.home": "首页", ... },
  en: { "nav.home": "Home", ... },
};

// 使用
const { t, language, setLanguage } = useLanguage();
<span>{t("nav.home")}</span>
```

### 翻译 Key 命名约定
- 导航: `nav.xxx`
- 页面: `pageName.element`
- 通用: `common.xxx`
- 统一使用点分隔命名

## 4.5 动画与交互规范

### prefers-reduced-motion 支持 (必须)
```tsx
// 所有动画组件必须支持
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

useEffect(() => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  setPrefersReducedMotion(mediaQuery.matches);
  // ... 监听变化
}, []);

// 条件渲染
if (prefersReducedMotion) {
  return <StaticVersion />;
}
```

### GSAP 动画模式
```tsx
// 使用 ScrollTrigger
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 清理资源
useEffect(() => {
  // 动画代码
  return () => {
    gsap.killTweensOf([elements]);
  };
}, []);
```

### Framer Motion 模式
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
```

## 4.6 文件目录结构

```
myBlog/
├── app/                    # 页面路由
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   ├── articles/           # 文章模块
│   ├── resume/             # 履历模块
│   └── about/              # 关于模块
├── components/             # 组件
│   ├── Navbar.tsx          # 导航
│   ├── Hero.tsx            # 首屏
│   ├── LanguageContext.tsx # 多语言
│   ├── about/              # 关于页专用
│   │   ├── illustrations/  # SVG 插画
│   │   └── ...
│   └── ...
├── lib/                    # 工具函数
├── content/articles/       # Markdown 文章
├── public/images/          # 静态图片
└── .agent/rules/           # AI 协作规范
```

## 4.7 常见问题与解决方案

### SSR 相关错误
| 问题 | 原因 | 解决方案 |
|------|------|----------|
| `window is not defined` | 服务端执行了浏览器代码 | 使用 `next/dynamic` + `ssr: false` |
| `localStorage is not defined` | 同上 | 在 `useEffect` 中访问 |
| Leaflet 地图白屏 | SSR 不支持 | 动态导入组件 |

### 样式问题
| 问题 | 原因 | 解决方案 |
|------|------|----------|
| `border-border` 无效 | Tailwind 未识别 CSS 变量 | 在 tailwind.config.ts 定义 colors |
| 深色模式不生效 | 未正确配置 | 检查 ThemeProvider + CSS 变量 |

### 类型错误
| 问题 | 解决方案 |
|------|----------|
| 模块无类型声明 | 创建 `types/xxx.d.ts` 或安装 `@types/xxx` |
| 动态导入组件类型 | 使用 `ComponentType` 定义类型 |