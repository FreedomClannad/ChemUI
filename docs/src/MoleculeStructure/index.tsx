import React, { type FC } from 'react';

const Foo: FC<{ title: string }> = (props) => {
  return <div>111</div>;
  // return MoleculeStructure({
  //   id: 'foo',
  //   structure: 'C1=CC=CC=C1',
  //   subStructure: 'C1=CC=CC=C1',
  //   extraDetails: {
  //     bondLineWidth: 1,
  //     addStereoAnnotation: true,
  //   },
  //   drawingDelay: 1000,
  //   onError: (error) => {
  //     console.error(error);
  //   },
  //   options: {
  //     locateFile: (file) => {
  //       if (file.endsWith('.wasm'))
  //         return `https://cdn.jsdelivr.net/npm/@rdkit/rdkit@2025.3.4-1.0.0/dist/RDKit_minimal.wasm`;
  //       return file;
  //     },
  //   },
  // });
};

export default Foo;
