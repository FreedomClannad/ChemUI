---
group:
  title: 分子相关
  order: 1
title: Smiles渲染
order: 3
---
# Smiles结构渲染

## 如何使用

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

## API

| 参数           | 说明          | 类型                                                          | 默认值 | 版本 |
|--------------| ------------- |-------------------------------------------------------------| ------ | ---- |
| id           | 需要给绑定id  | string                                                      |        |      |
| smiles       | smiles        | string                                                      |        |      |
| onError      | 错误回调      | (error) =>void                                              |        |      |
| options      | RDKit参数设置 | [RDKitLoaderOptions](molecule-structure#rdkitloaderoptions) |        |      |

