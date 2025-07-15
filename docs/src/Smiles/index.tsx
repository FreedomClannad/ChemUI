import { Smiles } from 'chem-ui';
import React, { type FC } from 'react';

const SmilesPage: FC<{ title: string }> = (props) => {
  return (
    <div>
      <Smiles
        smiles="c1ccccc1"
        options={{
          locateFile: (file) => {
            // 这里根据自己的服务器以及开发进行修改，同时版本号也可以根据自己的需要进行修改
            if (file.endsWith('.wasm'))
              return `https://cdn.jsdelivr.net/npm/@rdkit/rdkit@2025.3.3-1.0.0/dist/RDKit_minimal.wasm`;
            return file;
          },
        }}
      />
    </div>
  );
};

export default SmilesPage;
