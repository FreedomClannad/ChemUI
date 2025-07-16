import type {
  ChemUIListItemType,
  ChemUIModuleItemType,
  ChemUITextItemType,
} from 'chem-ui';
import { List, defaultDownloadTools, useListHook } from 'chem-ui';
import 'chem-ui/dist/index.css';
import React, { type FC, useEffect, useRef, useState } from 'react';

const DemoText: FC<{ title: string }> = (props) => {
  const Demo = {
    visual_data: [
      {
        name: 'Text的Demo名称',
        description: 'Text的Demo内容描述',
        files: [
          {
            type: 'TEXT',
            name: 'Text的展示名称',
            description: 'Text的展示描述',
            path: 'http://localhost:5500/test2.txt',
            download_url: 'http://localhost:5500/test2.txt',
            format: 'txt',
          },
        ],
        download_url: 'http://localhost:5500/test2.txt',
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
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setModuleItemList(validateObjectList(Demo) || []);
  }, []);

  return (
    <div className="h-[450px] overflow-y-auto" ref={rootRef}>
      <List
        customScrollParent={rootRef.current as HTMLElement}
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

export default DemoText;
