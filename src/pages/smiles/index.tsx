// import { MoleculeStructure } from "#";
import { MoleculeStructure } from "#";

const SmilesPage = () => {
	return (
		<div className="h-[100vh]">
			<MoleculeStructure
				id="molecule1"
				structure="c1ccccc1"
				options={{
					locateFile: file => {
						if (file.endsWith(".wasm")) return `https://cdn.jsdelivr.net/npm/@rdkit/rdkit@2025.3.3-1.0.0/dist/RDKit_minimal.wasm`;
						return file;
						// return `/${file}`;
					}
				}}
			/>
		</div>
	);
};

export default SmilesPage;
