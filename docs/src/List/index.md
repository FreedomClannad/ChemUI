---
title: List 定制列表
order: 1
---
# List 用于展示一组相关的信息。

## 如何使用
按照指定的格式，给相应的列表数据，即可展示。
## 格式

```json
{
  "visual_data": [
    {
      "name": "名称（必填）",
      "description": "描述（选填）",
      "download_url":"路径，以http或https开头（选填）",
      "files": [
        {
          "name": "名称（必填）",
          "path": "路径，以http或https开头（必填）（注意：在img情况下，可以传入http的路径或者以下格式[{name:'名称',path: 'xxx'}, {name:'名称',path: 'xxx'}]",
          "type": "类型（必填）当前有以下类型：3D、2D、table、CSV、text、markdown、img",
          "format": "格式（必填）由于3D格式显示的不同，所以此字段为必填，其余格式暂时以后缀为准，针对3D文件有以下字段，mol2 | mol | sdf | mmcif | cifCore | pdb | pdbqt | gro | xyz | lammps_data | lammps_traj_data" ,
          "description": "描述(选填)",
          "download_url":"路径，以http或https开头（选填）"
        }
      ],
      "text": [
        {
          "name": "名称（必填）",
          "content": "内容（必填）",
          "description": "描述(选填)"
        }
      ]
    }
  ]
}
```

## 组件展示
### 3D组件展示
<code src="./demo-3d.tsx"></code>

### 3D-SEQ组件
<code src="./demo-3d-seq.tsx"></code>

### 2D组件展示
<code src="./demo-2d.tsx"></code>

### CSV组件展示
<code src="./demo-csv.tsx"></code>

### TXT组件展示
<code src="./demo-text.tsx"></code>

### Markdown组件展示
<code src="./demo-markdown.tsx"></code>

### 单图片组件展示
<code src="./demo-single-img.tsx"></code>

### 多图片组件展示
<code src="./demo-multiple-img.tsx"></code>
