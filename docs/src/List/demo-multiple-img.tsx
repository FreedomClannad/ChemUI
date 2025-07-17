import type {
  ChemUIListItemType,
  ChemUIModuleItemType,
  ChemUITextItemType,
} from 'chem-ui';
import { List, defaultDownloadTools, useListHook } from 'chem-ui';
import 'chem-ui/dist/index.css';
import React, { type FC, useEffect, useState } from 'react';

const DemoMultipleList = () => {
  const path: { name: string; path: string }[] = [];
  for (let i = 0; i < 20; i++) {
    path.push({
      name: `这是多图片的名称-${i}`,
      path: 'https://www.alphama.com.cn/other/mol-img.svg',
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
        download_url: 'https://www.alphama.com.cn/other/mol-img.svg',
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
  useEffect(() => {
    setModuleItemList(validateObjectList(Demo) || []);
  }, []);

  return (
    <div className="h-[1000px] ">
      <List
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
