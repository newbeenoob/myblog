## 为什么

当前 about 页面的 BlueprintVsCode SVG 组件缺少交互效果和清晰的标注，导致用户难以理解设计初稿的含义。添加极简标注和交互效果可以提升用户体验，使设计意图更加明确。

## 变更内容

1. 在 Blueprint 区域添加极简标注：
   - 导航栏框格添加 Logo 文字和菜单图标
   - 侧边栏框格添加导航链接标识
   - 右侧卡片框格添加 Hero Section 和 Feature List 标注

2. 实现交互效果：
   - 为所有标注区域添加鼠标悬停效果
   - 当鼠标移动到对应区域时，该区域产生微弱的呼吸外发光效果
   - 确保标注文本在各种状态下保持显著可见

3. 代码区域处理：
   - 在右侧代码框内添加半透明的 `<div>...</div>` 伪代码元素作为视觉呼应

## 功能 (Capabilities)

### 新增功能
- `svg-interactive-effects`: 为 Blueprint SVG 添加标注和交互效果

### 修改功能
- `blueprint-vs-code`: 优化 BlueprintVsCode 组件的视觉呈现

## 影响

- `components/about/illustrations/BlueprintVsCode.tsx`: 主要修改文件
- `app/about/page.tsx`: 确保 SVG 正确显示
- `globals.css`: 可能需要添加新的 CSS 类