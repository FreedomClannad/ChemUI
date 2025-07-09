import { useState } from "react";
import { MoleculeStructure, type RDKitLoaderOptions } from "#/rdkit/molecule-structure.tsx";
import { getShortId } from "#/utils";

type Props = {
	id?: string;
	smiles: string;
	options?: RDKitLoaderOptions;
};
const Smiles = (props: Props) => {
	const { id = getShortId(), smiles, options } = props;
	const [errorState, setErrorState] = useState<boolean>(false);
	// if (errorState) {
	//   return <div className="h-full w-full">
	//     <div className="flex items-center justify-center h-[180px] w-full">
	//       <span>{smiles}</span>
	//     </div>
	//   </div>
	// }
	return (
		<div className="h-full w-full">
			<MoleculeStructure id={id} structure={smiles} onError={() => setErrorState(true)} options={options} />
		</div>
	);
};

export { Smiles };
