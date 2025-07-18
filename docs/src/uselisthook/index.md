---
group:
  title: Hook
  order: 1
title: useListHook
order: 1
---
## API
```tsx | pure
const { renderComponents, validateObjectList, parseJSONList } = useListHook();
```

## Result
| 参数               | 说明                                 | 类型                       |
| ------------------ | ------------------------------------ | -------------------------- |
| renderComponents   | 封装好的组件Map                      | ChemUIListItemComponentMap |
| validateObjectList | 传入对象进行校验并返回指定格式       | ChemUIAppItemType          |
| parseJSONList      | 传入json格式进行校验同时返回数据格式 | ChemUIAppItemType          |
