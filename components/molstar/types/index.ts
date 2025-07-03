import type { LoadFileData, LoadFileURL } from "#/molstar/viewer";

export enum MolstarLoadEnum {
	success = "finish",
	loading = "loading",
	error = "error"
}

export type MolstarLoadManager = {
	id: string;
	loadStatus: MolstarLoadEnum;
};

export type MolstarVisibleManager = {
	id: string;
	visible: boolean;
	label: string;
};

export type MolstarLoadFileURL = {
	id: string;
	loadFileURL: LoadFileURL;
};

export type MolstarLoadFileData = {
	id: string;
	loadFileData: LoadFileData;
};

export type MolstarCenterPosition = {
	x?: number;
	y?: number;
	z?: number;
	num?: string;
	chain?: string;
	label?: string;
};
export type MolstarBoxAttribute = {
	x: number;
	y: number;
	z: number;
	col?: number;
};

export enum InteractionsEnum {
	off = "off",
	on = "on"
}
export type interactions = {
	"cation-pi": InteractionsEnum;
	"halogen-bonds": InteractionsEnum;
	"hydrogen-bonds": InteractionsEnum;
	hydrophobic: InteractionsEnum;
	ionic: InteractionsEnum;
	"metal-coordination": InteractionsEnum;
	"pi-stacking": InteractionsEnum;
	"weak-hydrogen-bonds": InteractionsEnum;
};

export type interactionsKeys = keyof interactions;
