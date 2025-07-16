import type {
  ChemUIListItemType,
  ChemUIModuleItemType,
  ChemUITextItemType,
} from 'chem-ui';
import { List, defaultDownloadTools, useListHook } from 'chem-ui';
import 'chem-ui/dist/index.css';
import React, { type FC, useEffect, useRef, useState } from 'react';

const DemoMultipleList = () => {
  const path: { name: string; path: string }[] = [];
  for (let i = 0; i < 20; i++) {
    path.push({
      name: `这是多图片的名称-${i}`,
      path: 'https://patmap.alphama.com.cn/prod-api/profile/csr/2024/12/13/b1d004f9-5481-45ac-9ebe-2571fd3755a3.svg',
    });
  }
  const files = [
    {
      type: 'IMG',
      name: '这是图片列表内容',
      path,
      format: 'img',
    },
  ] as ChemUIListItemType[];
  return {
    visual_data: [
      {
        name: '多图片的Demo名称',
        description: '多图片的Demo内容描述',
        files,
        download_url:
          'https://patmap.alphama.com.cn/prod-api/profile/csr/2024/12/13/b1d004f9-5481-45ac-9ebe-2571fd3755a3.svg',
      },
    ],
  };
};

const DemoMultipleImg: FC<{ title: string }> = (props) => {
  const Demo = DemoMultipleList();

  const [moduleItemList, setModuleItemList] = useState<ChemUIModuleItemType[]>(
    [],
  );
  const defaultItemTool = defaultDownloadTools<ChemUIListItemType>();
  const defaultModuleTool = defaultDownloadTools<ChemUIModuleItemType>();
  const defaultTextTool = defaultDownloadTools<ChemUITextItemType>();
  const { renderComponents, validateObjectList } = useListHook();
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setModuleItemList(validateObjectList(Demo) || []);
  }, []);

  return (
    <div className="h-[1000px] overflow-y-auto" ref={rootRef}>
      <List
        customScrollParent={rootRef.current as HTMLElement}
        dataSource={moduleItemList}
        toolsData={{
          moduleTools: defaultModuleTool,
          itemTools: defaultItemTool,
          textItemTools: defaultTextTool,
        }}
        renderComponents={renderComponents}
      ></List>
    </div>
  );
};

export default DemoMultipleImg;
