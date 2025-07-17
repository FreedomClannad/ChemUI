import type {
  ChemUIListItemType,
  ChemUIModuleItemType,
  ChemUITextItemType,
} from 'chem-ui';
import { List, defaultDownloadTools, useListHook } from 'chem-ui';
import 'chem-ui/dist/index.css';
import React, { type FC, useEffect, useState } from 'react';

const Demo2D: FC<{ title: string }> = (props) => {
  const Demo = {
    visual_data: [
      {
        name: '2D的Demo名称',
        description: '2D的Demo内容描述',
        files: [
          {
            type: '2D',
            name: '2D的展示名称',
            description: '2D的展示描述',
            path: 'https://www.alphama.com.cn/other/2d-mol.mol',
            download_url: 'https://www.alphama.com.cn/other/2d-mol.mol',
            format: 'mol',
          },
        ],
        download_url: 'https://www.alphama.com.cn/other/2d-mol.mol',
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

export default Demo2D;
