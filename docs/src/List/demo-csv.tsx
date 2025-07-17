import type {
  ChemUIListItemType,
  ChemUIModuleItemType,
  ChemUITextItemType,
} from 'chem-ui';
import { List, defaultDownloadTools, useListHook } from 'chem-ui';
import 'chem-ui/dist/index.css';
import React, { type FC, useEffect, useState } from 'react';

const DemoCSV: FC<{ title: string }> = (props) => {
  const Demo = {
    visual_data: [
      {
        name: 'csv的Demo名称',
        description: 'csv的Demo内容描述',
        files: [
          {
            type: 'CSV',
            name: 'csv的展示名称',
            description: 'csv的展示描述',
            path: 'https://www.alphama.com.cn/other/CDK9_actives.csv',
            download_url: 'https://www.alphama.com.cn/other/CDK9_actives.csv',
            format: 'csv',
          },
        ],
        download_url: 'https://www.alphama.com.cn/other/CDK9_actives.csv',
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
    <div className="h-[850px]">
      <List
        dataSource={moduleItemList}
        toolsData={{
          moduleTools: defaultModuleTool,
          itemTools: defaultItemTool,
          textItemTools: defaultTextTool,
        }}
        renderComponents={renderComponents}
        config={{
          csv: {
            smilesOptions: {
              locateFile: (file: string) => {
                if (file.endsWith('.wasm'))
                  return `https://cdn.jsdelivr.net/npm/@rdkit/rdkit@2025.3.3-1.0.0/dist/RDKit_minimal.wasm`;
                return file;
              },
            },
          },
        }}
      ></List>
    </div>
  );
};

export default DemoCSV;
