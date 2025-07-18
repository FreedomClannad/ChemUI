---
nav: 指南
group:
  title: 帮助
  order: 10
---
# 问题

## TailwindCSS 问题
本项目使用了 TailwindCSS 作为 CSS 框架，TailwindCSS 是一个实用的 CSS 框架，它提供了一组预定义的样式类，使得开发者可以快速构建响应式的用户界面。

### 1.如果遇到样式没法生效的问题
可能是因为 TailwindCSS 的配置文件 `tailwind.config.js` 中没有正确引入组件库的样式文件。可以在 `tailwind.config.js` 中添加以下代码：
```js
module.exports = {
  content: [
    // 这里是你的项目的样式文件路径
    "./src/**/*.{js,jsx,ts,tsx}",
    // 这里是chem-ui的文件路径
    "./node_modules/chem-ui/**/*.{js,jsx,ts,tsx}"
  ]
}
```
