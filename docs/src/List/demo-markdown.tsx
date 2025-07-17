import type {
  ChemUIListItemType,
  ChemUIModuleItemType,
  ChemUITextItemType,
} from 'chem-ui';
import { List, defaultDownloadTools, useListHook } from 'chem-ui';
import 'chem-ui/dist/index.css';
import React, { type FC, useEffect, useState } from 'react';

const DemoMarkdown: FC<{ title: string }> = (props) => {
  const Demo = {
    visual_data: [
      {
        name: 'Markdown的Demo名称',
        description: 'Markdown的Demo内容描述',
        files: [
          {
            type: 'MARKDOWN',
            name: 'Markdown的展示名称',
            description: 'Markdown的展示描述',
            path: 'https://www.alphama.com.cn/other/README.md',
            download_url: 'https://www.alphama.com.cn/other/README.md',
            format: 'markdown',
          },
        ],
        download_url: 'https://www.alphama.com.cn/other/README.md',
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
    <div className="h-[450px]">
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

export default DemoMarkdown;
