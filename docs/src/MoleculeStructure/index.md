---
group:
  title: 分子相关
  order: 1
title: 分子结构渲染
order: 3
---
# MoleculeStructure 分子结构渲染

## 如何使用

```tsx
import { MoleculeStructure } from 'chem-ui';
export default () => 
  <MoleculeStructure 
    id="molecule1" 
    structure='c1ccccc1'  
    options={{
      locateFile: (file) => {
            // 这里根据自己的服务器以及开发进行修改，同时版本号也可以根据自己的需要进行修改
            if (file.endsWith('.wasm'))
                return `https://cdn.jsdelivr.net/npm/@rdkit/rdkit@2025.3.3-1.0.0/dist/RDKit_minimal.wasm`;
            return file;
            }
        }
    } 
  />
```

## API

| 参数         | 说明          | 类型               | 默认值 | 版本 |
| ------------ | ------------- | ------------------ | ------ | ---- |
| id           | 需要给绑定id  | string             |        |      |
| width        | 宽度          | number             | 100    |      |
| height       | 高度          | number             | 100    |      |
| structure    | smiles        | string             |        |      |
| subStructure | 截取的smiles  | string             |        |      |
| drawingDelay | 延迟渲染时间  | number             |        |      |
| onError      | 错误回调      | (error) =>void     |        |      |
| options      | RDKit参数设置 | RDKitLoaderOptions |        |      |

### 类型 
#### RDKitLoaderOptions

| 参数       | 说明                                       | 类型             | 默认值 | 版本 |
| ---------- | ------------------------------------------ | ---------------- | ------ | ---- |
| locateFile | 服务器上 RDKit 模块 .wasm 文件的可选路径。 | (file) => string |        |      |
