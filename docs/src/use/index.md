---
nav:
  title: 组件
  order: 0
group:
  title: 介绍
  order: -1
title: 快速上手
order: 1
---

# 如何使用

## 安装
**我们推荐使用 [npm](https://www.npmjs.com/) 或 [yarn](https://github.com/yarnpkg/yarn/) 的方式进行开发**，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

<InstallDependencies npm='$ npm install chem-ui --save' yarn='$ yarn add chem-ui'></InstallDependencies>

如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm)。

## 简单示例
```tsx
import { Smiles } from 'chem-ui';
import 'chem-ui/dist/index.css';
export default () =>
  <Smiles
    smiles="c1ccccc1"
    options={{
      locateFile: (file) => {
        // 这里根据自己的服务器以及开发进行修改，同时版本号也可以根据自己的需要进行修改
        if (file.endsWith('.wasm'))
          return `https://cdn.jsdelivr.net/npm/@rdkit/rdkit@2025.3.3-1.0.0/dist/RDKit_minimal.wasm`;
        return file;
      },
    }}
  />
```

## 谁在使用

可以查看[Sciminer](https://sciminer.protonunfold.com/)
