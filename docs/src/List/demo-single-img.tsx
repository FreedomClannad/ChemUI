import type {
  ChemUIListItemType,
  ChemUIModuleItemType,
  ChemUITextItemType,
} from 'chem-ui';
import { List, defaultDownloadTools, useListHook } from 'chem-ui';
import 'chem-ui/dist/index.css';
import React, { type FC, useEffect, useState } from 'react';

const DemoSingleImg: FC<{ title: string }> = (props) => {
  const Demo = {
    visual_data: [
      {
        name: '单图片的Demo名称',
        description: '单图片的Demo内容描述',
        files: [
          {
            type: 'IMG',
            name: '单图片的展示名称',
            description: '单图片的展示描述',
            path: 'https://www.alphama.com.cn/other/mol-img.svg',
            download_url: 'https://www.alphama.com.cn/other/mol-img.svg',
            format: 'img',
          },
        ],
        download_url: 'https://www.alphama.com.cn/other/mol-img.svg',
      },
    ],
  };

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
    <div className="h-[1000px]">
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

export default DemoSingleImg;
