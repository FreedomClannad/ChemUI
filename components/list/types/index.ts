import type { FC, ReactNode } from "react";
import Button from "#/list/components/Button";
import {
	CSV,
	TextBox,
	ImgBox,
	Molstar,
	MolstarSeq,
	MolstarPanelSingle,
	MolstarPanelMulti,
	MolstarPanelPicker,
	MolstarImageSingle,
	MolstarImageMulti,
	MolstarImagePicker
} from "#/list/components";
export enum ChemUIListTypeEnum {
	MOLSTAR = "3D",
	MOLSTAR_SEQ = "3D-SEQ",
	MOLSTAR_PANEL_SINGLE = "3D-Panel-Single",
	MOLSTAR_PANEL_MULTI = "3D-Panel-Multi",
	MOLSTAR_PANEL_PICKER = "3D-Panel-Picker",
	MOLSTAR_IMAGE_SINGLE = "3D-Image-Single",
	MOLSTAR_IMAGE_MULTI = "3D-Image-Multi",
	MOLSTAR_IMAGE_PICKER = "3D-Image-Picker",
	KETCHER = "2D",
	TABLE = "TABLE",
	CSV = "CSV",
	TEXT = "TEXT",
	MARKDOWN = "MARKDOWN",
	IMG = "IMG"
}
export type ChemUIListFileType = {
	name: string;
	path: string;
	smiles?: string;
	format: string;
};

export type ChemUITextItemType = {
	name: string;
	content: never;
	description?: string;
	options?: never;
	download_url?: string;
};

export type ChemUIListItemContentType = {
	type: ChemUIListTypeEnum | string;
	name: string;
	path: string | ChemUIListFileType[];
	format: string;
	description?: string;
	download_url?: string;
	smiles?: string;
};

export type ChemUIListItemOptionsType = {
	contentHeight?: number | string;
};

export type ChemUIListItemType = ChemUIListItemContentType & ChemUIListItemOptionsType;

export type ChemUIListItemComponentMap = {
	[key in ChemUIListTypeEnum]: FC<ChemUIListItemType>;
} & {
	[key: string]: FC<ChemUIListItemType>;
};

export const defaultChemUIListItemComponents: ChemUIListItemComponentMap = {
	[ChemUIListTypeEnum.TABLE]: Button,
	[ChemUIListTypeEnum.MOLSTAR]: Molstar,
	[ChemUIListTypeEnum.KETCHER]: Button,
	[ChemUIListTypeEnum.CSV]: CSV,
	[ChemUIListTypeEnum.TEXT]: TextBox,
	[ChemUIListTypeEnum.MARKDOWN]: Button,
	[ChemUIListTypeEnum.IMG]: ImgBox,
	[ChemUIListTypeEnum.MOLSTAR_SEQ]: MolstarSeq,
	[ChemUIListTypeEnum.MOLSTAR_PANEL_SINGLE]: MolstarPanelSingle,
	[ChemUIListTypeEnum.MOLSTAR_PANEL_MULTI]: MolstarPanelMulti,
	[ChemUIListTypeEnum.MOLSTAR_PANEL_PICKER]: MolstarPanelPicker,
	[ChemUIListTypeEnum.MOLSTAR_IMAGE_SINGLE]: MolstarImageSingle,
	[ChemUIListTypeEnum.MOLSTAR_IMAGE_MULTI]: MolstarImageMulti,
	[ChemUIListTypeEnum.MOLSTAR_IMAGE_PICKER]: MolstarImagePicker
};

export type ChemUIToolsItemType<T> = {
	icon: (item: T) => ReactNode;
	onClick: (item: T) => void;
};

export type ChemUIModuleItemType = {
	name: string;
	description?: string;
	options?: never;
	download_url?: string;
	files?: ChemUIListItemType[];
	text?: ChemUITextItemType[];
};

export type ChemUIAppItemType = {
	visual_data: ChemUIModuleItemType[];
	download_url?: string;
};

export enum ModeEnum {
	"SINGLE" = "Single",
	"MULTI" = "Multi"
}
