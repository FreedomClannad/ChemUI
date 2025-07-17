import type {
  ChemUIListItemType,
  ChemUIModuleItemType,
  ChemUITextItemType,
} from 'chem-ui';
import { List, defaultDownloadTools, useListHook } from 'chem-ui';
import 'chem-ui/dist/index.css';
import React, { type FC, useEffect, useState } from 'react';

const Demo3D: FC<{ title: string }> = (props) => {
  const Demo = {
    visual_data: [
      {
        name: '3D的Demo名称',
        description: '3D的Demo内容描述',
        files: [
          {
            type: '3D',
            name: '3D的展示名称',
            description: '3D的展示描述',
            path: 'https://www.alphama.com.cn/other/proteins.pdb',
            download_url: 'https://www.alphama.com.cn/other/proteins.pdb',
            format: 'pdb',
          },
        ],
        download_url: 'https://www.alphama.com.cn/other/proteins.pdb',
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
    <div className="h-[700px] overflow-y-auto">
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

export default Demo3D;
