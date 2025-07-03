import type { BuiltInTrajectoryFormat } from "molstar/lib/mol-plugin-state/formats/trajectory";

type MolstarFormatsType = {
	[key: string]: string;
};
export const MolstarFormats: MolstarFormatsType = {
	PDB: "pdb",
	CIF: "mmcif",
	MMCIF: "mmcif",
	BCIF: "mmcif",
	MOL: "mol",
	SDF: "sdf",
	MOL2: "mol2",
	XYZ: "xyz"
};

// 根据后缀转换格式
export const getMolstarFormat = (ext = "mmcif"): BuiltInTrajectoryFormat => {
	const key = ext.toUpperCase();
	return (MolstarFormats[key] || "mmcif") as BuiltInTrajectoryFormat;
};
