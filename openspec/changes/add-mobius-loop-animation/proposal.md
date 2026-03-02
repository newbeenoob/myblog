## 为什么

当前 about 页面的 Code 区域是空白的，缺乏视觉吸引力和动态效果。添加莫比乌斯环动画可以提升用户体验，展示产品的连续性和无限可能性。

## 变更内容

1. 在 about 页面的 Code 区域添加莫比乌斯环动画效果
2. 沿莫比乌斯环路径添加一个动画发光点，该发光点应沿环持续移动
3. 在莫比乌斯环周围区域填充极简风格的占位文字
4. 确保整个 SVG 动画在各种屏幕尺寸下都能正确显示，保持响应式设计
5. 动画效果应平滑流畅，无卡顿或闪烁现象，发光点的亮度和移动速度需适中
6. 整体视觉效果需与原 SVG 的设计风格保持一致，颜色搭配协调

## 功能 (Capabilities)

### 新增功能
- `mobius-loop-animation`: 在 about 页面的 Code 区域添加莫比乌斯环动画效果

### 修改功能
- `about-page-content`: 优化 about 页面的视觉呈现

## 影响

- `components/about/AboutContent.tsx`: 主要修改文件
- `app/about/page.tsx`: 确保 SVG 正确显示
- `globals.css`: 可能需要添加新的 CSS 类