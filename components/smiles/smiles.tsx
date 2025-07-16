import { MoleculeStructure, type RDKitLoaderOptions } from "#/rdkit/molecule-structure.tsx";
import { getShortId } from "#/utils";

type Props = {
	id?: string;
	smiles: string;
	options?: RDKitLoaderOptions;
	onError?: (error: Error) => void;
};
const Smiles = (props: Props) => {
	const { id = getShortId(), smiles, options, onError } = props;
	return (
		<div className="h-full w-full">
			<MoleculeStructure id={id} structure={smiles} onError={onError} options={options} />
		</div>
	);
};

export { Smiles };
