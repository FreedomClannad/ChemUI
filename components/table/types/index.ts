import type { AlignType } from "rc-table/lib/interface";
import { LayoutDirectionEnum } from "#/layout/types";

export enum TableTypeEnum {
	TABS_TABLE = "tabs-table",
	BASE_TABLE = "base-table"
}

export enum TableStateEnum {
	SUCCESS = "success",
	FAIL = "fail"
}

export type TableOptions = {
	rowSelection?: boolean;
	rowSelectionKey?: string;
};
export enum TableHeaderTypeEnum {
	STRING = "string",
	NUMBER = "number",
	IMG = "img",
	MOLSTAR = "molstar"
}

export type TableHeaderType = {
	key: string;
	title: string;
	type: TableHeaderTypeEnum;
	align?: AlignType;
	tooltip?: string;
};
export type TableType = {
	name: string;
	options: TableOptions;
	header: TableHeaderType[];
	data: any[];
};

export type TableDataType = {
	key: string;
	[key: string]: string | number | React.Key;
};

export type TableColumnsStateType = {
	key: string;
	molstarOpen: boolean;
};

export type TableMolstarType = {
	open: boolean;
};

export type TableOptionType = {
	molstar: TableMolstarType;
	direction?: LayoutDirectionEnum;
};

export type ChemUITableOption = {
	type: TableTypeEnum;
	state: TableStateEnum;
	series: TableType[];
	options?: TableOptionType;
};
