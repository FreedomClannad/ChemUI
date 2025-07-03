import type { FC } from "react";
import { TabsTable } from "./tabs-table";

import { MolstarViewer } from "#";
import { MolstarContext } from "#/context";
import { useMolstar, type useMolstarType } from "#/molstar/hooks";
import { type ChemUITableOption, TableStateEnum, TableTypeEnum } from "#/table/types";
import { TABLE_LAYOUT_DIRECTION_DEFAULT, TABLE_OPTIONS_DEFAULT } from "#/table/defaults";
import { LayoutDirectionEnum } from "#/layout/types";
import { ListTable } from "#/table/list-table";
import { Layout } from "#/layout";
type ChemUITableRenderType = {
	[key in TableTypeEnum]: FC<any>;
};

const ChemUITableRenderMap: ChemUITableRenderType = {
	[TableTypeEnum.TABS_TABLE]: TabsTable,
	[TableTypeEnum.BASE_TABLE]: ListTable
};

const isValidChemUITable = (option: string | ChemUITableOption | undefined) => {
	if (!option) return false;
	if (typeof option === "string") {
		try {
			const tableOption = JSON.parse(option) as ChemUITableOption;
			if (!tableOption) return false;
			return !!ChemUITableRenderMap[tableOption.type];
		} catch (e) {
			return false;
		}
	}
	if (typeof option === "object") {
		// 这里需要加入整个类型校验，根据不同的类型，校验规则不同
		return !!ChemUITableRenderMap[option.type];
	}

	return true;
};

const ChemUILayoutDirection = (option: string | ChemUITableOption | undefined): LayoutDirectionEnum => {
	if (!option) return TABLE_LAYOUT_DIRECTION_DEFAULT;
	if (typeof option === "string") {
		try {
			const tableOption = JSON.parse(option) as ChemUITableOption;
			if (!tableOption) return TABLE_LAYOUT_DIRECTION_DEFAULT;
			const { options } = tableOption;
			if (!options) return TABLE_LAYOUT_DIRECTION_DEFAULT;
			const { direction } = options;
			if (!direction) return TABLE_LAYOUT_DIRECTION_DEFAULT;
			return direction;
		} catch (e) {
			return TABLE_LAYOUT_DIRECTION_DEFAULT;
		}
	}
	if (typeof option === "object") {
		const { options } = option;
		if (!options) return TABLE_LAYOUT_DIRECTION_DEFAULT;
		const { direction } = options;
		if (direction) return direction;
		return TABLE_LAYOUT_DIRECTION_DEFAULT;
	}

	return TABLE_LAYOUT_DIRECTION_DEFAULT;
};

type MolstarRenderProps = {
	molstarHooks: useMolstarType;
};
const MolstarRender = ({ molstarHooks }: MolstarRenderProps) => {
	const { MolstarRef, setIsMolstarMounted } = molstarHooks;
	return (
		<MolstarViewer
			ref={MolstarRef}
			onLoad={() => {
				setIsMolstarMounted(true);
			}}
		></MolstarViewer>
	);
};

type Props = {
	option: ChemUITableOption;
};
const MolstarTable = (props: Props) => {
	const { option } = props;
	const { type, state, options = TABLE_OPTIONS_DEFAULT } = option;
	const { molstar, direction = TABLE_LAYOUT_DIRECTION_DEFAULT } = options;
	const molstarHooks = useMolstar({ isMerge: false });
	const Component = ChemUITableRenderMap[type];
	if (!Component) return <div>无指定的表格可以渲染</div>;
	if (state === TableStateEnum.FAIL) return <div>数据渲染失败</div>;
	if (!molstar.open) return <Component {...option} />;
	return (
		<MolstarContext.Provider value={molstarHooks}>
			<Layout
				direction={direction}
				mainContainer={<Component {...option} />}
				minorContainer={<MolstarRender molstarHooks={molstarHooks} />}
			/>
		</MolstarContext.Provider>
	);
};

export { TabsTable, ChemUITableRenderMap, MolstarTable, isValidChemUITable, ChemUILayoutDirection };
